import { FC, useContext } from "react";
import Box from "@mui/material/Box";
import { TreeView } from "@mui/x-tree-view/TreeView";

import { MinusSquare, PlusSquare } from "./icons";
import { TableData } from "../../constants/data";
import { FullyQualifiedTableName, FullTableName } from "../../types/types";
import { QueryBuilderContext } from "../../contexts/queryBuilderContext";
import { ListerTreeItem } from "./ListerTreeItem";

export const SchemaLister: FC = () => {
  const { tables, setTables } = useContext(QueryBuilderContext);

  const handleSelectTable = ({ database, schema, tableName, columns, expanded }: FullTableName) => {
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

  const findSchemaAndDb = (tableName: string) => {
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

  return (
    <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 500, padding: 1 }}>
      <TreeView
        aria-label="customized"
        defaultExpanded={["1"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        sx={{ overflowX: "hidden" }}
      >
        {TableData.map((db) => <ListerTreeItem
          {...db}
          handleSelectTable={handleSelectTable}
          findSchemaAndDb={findSchemaAndDb}
        />)}
      </TreeView>
    </Box>
  );
}
