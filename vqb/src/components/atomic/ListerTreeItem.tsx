import { FC } from "react";
import { FaDatabase } from "react-icons/fa";
import { MdAbc, MdOutlineSchema } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";
import { GoNumber } from "react-icons/go";

import { FullTableName, FullyQualifiedTableName, TreeProps } from "../../types/types";
import SchemaListerTreeItem from "./TreeItem";

type ListerTreeItemProps = TreeProps & {
  handleSelectTable: (tableData: FullTableName) => void;
  findSchemaAndDb: (tableName: string) => FullyQualifiedTableName;
}

export const ListerTreeItem: FC<ListerTreeItemProps> = (nodes) => {
  return (
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
            nodes.findSchemaAndDb(nodes.name);
          nodes.handleSelectTable({
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
        ? nodes.children.map(node => <ListerTreeItem
          {...node}
          handleSelectTable={nodes.handleSelectTable}
          findSchemaAndDb={nodes.findSchemaAndDb}
        />)
        : null}
    </SchemaListerTreeItem>
  );
}