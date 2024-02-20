import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  Node,
  Edge,
  addEdge,
  getIncomers,
  getConnectedEdges,
  getOutgoers,
  NodeTypes,
  FitViewOptions,
  DefaultEdgeOptions,
} from "reactflow";
import "reactflow/dist/style.css";
import { useEffect, useCallback, useContext, createContext } from "react";
import React from "react";
import { Table, Query, QueryBuilderContextProps } from "../types";
import DbNode from "./components/DbNode";
import CustomEdge from "./components/CustomEdge";
import { Grid, Box } from "@mui/material";
import SchemaLister from "./components/schemaLister/SchemaLister";

export const QueryBuilderContext = createContext<QueryBuilderContextProps>({
  nodes: [],
  setNodes: () => {},
  edges: [],
  setEdges: () => {},
  action: "",
  setAction: () => {},
  tables: [{ database: "", schema: "", tableName: "", columns: [] }],
  setTables: () => {},
  query: {
    primaryDatabase: "",
    primarySchema: "",
    primaryTable: "",
    primaryColumn: "",
    secondaryDatabase: "",
    secondarySchema: "",
    secondaryTable: "",
    secondaryColumn: "",
    action: "",
  },
  setQuery: () => {},
  queryLoading: false,
  setQueryLoading: () => {},
  editorQuery: "",
  setEditorQuery: () => {},
});

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
};

type QueryBuilderChartProps = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  editorQuery: string;
  setEditorQuery: React.Dispatch<React.SetStateAction<string>>;
  queryLoading: boolean;
  setQueryLoading: React.Dispatch<React.SetStateAction<boolean>>;
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
};

function QueryBuilderChart({
  nodes,
  setNodes,
  edges,
  setEdges,
  editorQuery,
  setEditorQuery,
  queryLoading,
  setQueryLoading,
  query,
  setQuery,
  tables,
  setTables,
}: QueryBuilderChartProps) {
  const [action, setAction] = React.useState("");

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
    let remainingTables = tables.filter((table) => {
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
        queryLoading: queryLoading,
        setQueryLoading: setQueryLoading,
        editorQuery: editorQuery,
        setEditorQuery: setEditorQuery,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div style={{ height: 600, width: "100%" }}>
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
          </div>
        </Grid>
        <Grid item xs={3}>
          <Box height={"100%"} width={"100%"} className="vqb" bgcolor={"white"}>
            <SchemaLister />
          </Box>
        </Grid>
      </Grid>
    </QueryBuilderContext.Provider>
  );
}

export default QueryBuilderChart;
