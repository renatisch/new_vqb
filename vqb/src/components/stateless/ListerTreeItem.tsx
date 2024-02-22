import { FaDatabase } from "react-icons/fa";
import { MdAbc, MdOutlineSchema } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";
import { GoNumber } from "react-icons/go";

import { component } from "../../framework";
import { FullTableName, FullyQualifiedTableName, TreeProps } from "../../types/types";
import { SchemaListerTreeItem } from "./TreeItem";

type ListerTreeItemProps = TreeProps & {
  handleSelectTable: (tableData: FullTableName) => void;
  findSchemaAndDb: (tableName: string) => FullyQualifiedTableName;
};

export const ListerTreeItem = component<ListerTreeItemProps>(({ children, objectType, id, name, expanded, dataType, handleSelectTable, findSchemaAndDb }) => {
  const onClick = () => {
    if (objectType === "table") {
      const fullyQualifiedObject: FullyQualifiedTableName = findSchemaAndDb(name);
      handleSelectTable({
        database: fullyQualifiedObject.databaseName,
        schema: fullyQualifiedObject.schemaName,
        tableName: name,
        columns: children,
        expanded: expanded,
      });
    }
  }
  
  return (
    <SchemaListerTreeItem nodeId={id} labelText={name} labelIcon={
        objectType === "database" ? (
          <FaDatabase />
        ) : objectType === "schema" ? (
          <MdOutlineSchema />
        ) : objectType === "table" ? (
          <CiViewTable />
        ) : objectType === "column" && dataType === "string" ? (
          <MdAbc />
        ) : (
          <GoNumber />
        )
      }
      onDoubleClick={onClick}
    >
      {Array.isArray(children)
        ? children.map(node => <ListerTreeItem
          {...node}
          key={node.id}
          handleSelectTable={handleSelectTable}
          findSchemaAndDb={findSchemaAndDb}
        />)
        : null}
    </SchemaListerTreeItem>
  );
});