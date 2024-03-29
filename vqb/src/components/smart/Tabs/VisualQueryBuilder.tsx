import { Dispatch, SetStateAction, useState, useEffect, useCallback } from "react";
import ReactFlow, { applyEdgeChanges, applyNodeChanges, OnNodesChange, OnEdgesChange, Node, Edge, addEdge, getIncomers, getConnectedEdges, getOutgoers, NodeTypes, FitViewOptions, DefaultEdgeOptions } from "reactflow";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { UseQueryResult } from "react-query";

import { component } from "../../../framework";
import { Table, Query, TableQuery } from "../../../types/types";
import { InitialData } from "../../../types/api";
import { QueryBuilderContext } from "../../../contexts/queryBuilderContext";
import { DbNode } from "../../atomic/DbNode";
import { CustomEdge } from "../../atomic/CustomEdge";
import { SchemaLister } from "../../atomic/SchemaLister";
import { ActionButtons } from "../../stateless/ActionButtons";

import "reactflow/dist/style.css";

const nodeTypes: NodeTypes = {
  dbNode: DbNode,
};
const edgeTypes = {
  "custom-edge": CustomEdge,
};

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const styles = {
  background: "white",
  height: "100%",
  boxShadow: '0px 1px 2px 1px #0002'
};

type VisualQueryBuilderProps = {
  editorQuery: string;
  setEditorQuery: Dispatch<SetStateAction<string>>;
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
  tables: Table[];
  setTables: Dispatch<SetStateAction<Table[]>>;
  hidden: boolean;
  initialData: UseQueryResult<InitialData>;
};

export const VisualQueryBuilder = component<VisualQueryBuilderProps>(({ hidden, editorQuery, setEditorQuery, query, setQuery, tables, setTables, initialData }) => {
  const [action, setAction] = useState("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const databases = initialData.data?.databases;

  const onTableAdd = (tableQuery: TableQuery) => {
    setTables([...tables, {
      database: tableQuery.dbName,
      schema: tableQuery.schemaName,
      tableName: tableQuery.tableName,
      columns: tableQuery.columns.map(column => ({
        id: column.name,
        name: column.name,
        objectType: column.dataType
      }))
    }]);
  }

  const getNode = (table: Table, index: number) => {
    return {
      id: index.toString(),
      data: {
        handleType: index === 0 ? "source" : "target",
        database: table.database,
        schema: table.schema,
        tableName: table.tableName,
        columns: table.columns,
        expanded: table.expanded,
      },
      position: {
        x: 0,
        y: 0,
      },
      type: "dbNode",
    };
  };

  useEffect(() => {
    tables.map((table: Table, index) => {
      if (table.tableName === "") {
        setTables([]);
      } else {
        if (nodes.length > 0) {
          nodes.map((node) => {
            if (table.tableName !== node.data["tableName"]) {
              setNodes((nodes) => [...nodes, getNode(table, index)]);
            } else {
              setNodes(nodes);
            }
          });
        } else {
          setNodes((nodes) => [...nodes, getNode(table, index)]);
        }
      }
    });
  }, [tables]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: any) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const deleteTable = (tableName: string) => {
    const remainingTables = tables.filter((table) => {
      if (table.tableName !== tableName) {
        return table;
      }
    });
    setTables(remainingTables);
  };

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
      deleteTable(deleted[0].data["tableName"]);
      setAction("");
      if (deleted[0].data["handleType"] === "source") {
        setQuery({
          ...query,
          primarySchema: "",
          primaryColumn: "",
          primaryDatabase: "",
          primaryTable: "",
          action: "",
        });
      } else {
        setQuery({
          ...query,
          secondaryDatabase: "",
          secondarySchema: "",
          secondaryTable: "",
          secondaryColumn: "",
          action: "",
        });
      }
    },
    [nodes, edges]
  );

  return (
    <Grid container style={{ height: '100%', display: hidden ? 'none' : 'block' }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box style={{ height: 600, width: "100%" }}>
            <QueryBuilderContext.Provider
              value={{
                nodes: nodes,
                setNodes: setNodes,
                edges: edges,
                setEdges: setEdges,
                action,
                setAction,
                tables: tables,
                setTables: setTables,
                query: query,
                setQuery: setQuery,
                editorQuery: editorQuery,
                setEditorQuery: setEditorQuery,
              }}
            >
              <ReactFlow
                style={styles}
                nodes={nodes}
                edges={edges}
                onNodesDelete={onNodesDelete}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                fitViewOptions={fitViewOptions}
                defaultEdgeOptions={defaultEdgeOptions}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
              />
            </QueryBuilderContext.Provider>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box bgcolor="white" boxShadow='0px 1px 2px 1px #0002'>
            <SchemaLister onTableAdd={onTableAdd} databases={databases} />
          </Box>
        </Grid>
      </Grid>
      <ActionButtons />
    </Grid>
  );
});
