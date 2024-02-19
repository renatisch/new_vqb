import Box from "@mui/material/Box";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { CiViewTable } from "react-icons/ci";
import { MdOutlineSchema } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import SchemaListerTreeItem from "./components/TreeItem";
import { GoNumber } from "react-icons/go";
import { MdAbc } from "react-icons/md";
import { MinusSquare, PlusSquare } from "./components/icons";
import { TableData } from "./data";
import { TreeProps } from "./types";
import { QueryBuilderContext } from "../../QueryBuilderChart";
import { useContext } from "react";
import { FullyQualifiedTableName, FullTableName } from "./types";

export default function SchemaLister() {
  const { tables, setTables } = useContext(QueryBuilderContext);

  const handleSelectTable = ({
    database,
    schema,
    tableName,
    columns,
    expanded,
  }: FullTableName) => {
    let uniqueTables = tables.filter((table) => {
      if (table.tableName !== tableName) {
        return table;
      }
    });
    setTables([
      ...uniqueTables,
      {
        database: database,
        schema: schema,
        tableName: tableName,
        columns: columns,
        expanded: expanded,
      },
    ]);
  };

  const find_schema_and_db = (tableName: string) => {
    let QualifiedTableName: FullyQualifiedTableName = {};
    TableData.map((db: any) => {
      db.children.map((schema: any) => {
        schema.children.map((tables: any) => {
          if (tables.name === tableName) {
            QualifiedTableName = {
              databaseName: db.name,
              schemaName: schema.name,
              tableName: tableName,
            };
          }
        });
      });
    });
    return QualifiedTableName;
  };

  const renderTree = (nodes: TreeProps) => (
    <SchemaListerTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      labelText={nodes.name}
      labelIcon={
        nodes.objectType === "database" ? (
          <FaDatabase />
        ) : nodes.objectType === "schema" ? (
          <MdOutlineSchema />
        ) : nodes.objectType === "table" ? (
          <CiViewTable />
        ) : nodes.objectType === "column" && nodes.dataType === "string" ? (
          <MdAbc />
        ) : (
          <GoNumber />
        )
      }
      onDoubleClick={() => {
        if (nodes.objectType === "table") {
          let fullyQualifiedObject: FullyQualifiedTableName =
            find_schema_and_db(nodes.name);
          handleSelectTable({
            database: fullyQualifiedObject.databaseName,
            schema: fullyQualifiedObject.schemaName,
            tableName: nodes.name,
            columns: nodes.children,
            expanded: nodes.expanded,
          });
        }
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </SchemaListerTreeItem>
  );

  return (
    <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 500, padding: 1 }}>
      <TreeView
        aria-label="customized"
        defaultExpanded={["1"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        sx={{ overflowX: "hidden" }}
      >
        {TableData.map((db) => {
          return renderTree(db);
        })}
      </TreeView>
    </Box>
  );
}
