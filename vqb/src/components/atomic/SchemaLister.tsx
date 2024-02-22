import { useContext } from "react";
import Box from "@mui/material/Box";
import { TreeView } from "@mui/x-tree-view/TreeView";

import { component } from "../../framework";
import { MinusSquare, PlusSquare } from "../stateless/icons";
import { TableData } from "../../constants/data";
import { FullyQualifiedTableName, FullTableName } from "../../types/types";
import { QueryBuilderContext } from "../../contexts/queryBuilderContext";
import { ListerTreeItem } from "../stateless/ListerTreeItem";

export const SchemaLister = component(() => {
  const { tables, setTables } = useContext(QueryBuilderContext);

  const handleSelectTable = ({ database, schema, tableName, columns, expanded }: FullTableName) => {
    const uniqueTables = tables.filter((table) => {
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
    TableData.forEach((db: any) => {
      db.children.forEach((schema: any) => {
        schema.children.forEach((tables: any) => {
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
          key={db.id}
          handleSelectTable={handleSelectTable}
          findSchemaAndDb={findSchemaAndDb}
        />)}
      </TreeView>
    </Box>
  );
});
