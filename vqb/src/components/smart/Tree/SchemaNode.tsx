import { useState } from "react";
import { MdOutlineSchema } from "react-icons/md";

import { component, useProp, useQuery } from "../../../framework";
import { TableQuery } from "../../../types/types";
import { api } from "../../../utils/api";
import { SchemaListerTreeItem } from "../../stateless/TreeItem";
import { TableNode } from "./TableNode";

type DbSchemaProps = {
  dbName: string;
  schemaName: string;
  isExpanded: boolean;
  onTableAdd: (queryTable: TableQuery) => void;
};

export const SchemaNode = component<DbSchemaProps>(({ dbName, schemaName, isExpanded, onTableAdd }) => {
  const queryDbName = isExpanded ? dbName : undefined;
  const [expanded, setExpanded] = useState<string[]>([]);
  const subNodes = useQuery(api.getTableList, queryDbName, schemaName);
  const tableNames = useProp(subNodes.data);

  return (
    <SchemaListerTreeItem nodeId={schemaName} labelText={schemaName} labelIcon={<MdOutlineSchema />} isLoadingChildren={subNodes.isLoading} onNodeToggle={setExpanded}>
      {tableNames?.map(tableName =>
        <TableNode key={tableName} isExpanded={expanded.includes(tableName)} dbName={dbName} schemaName={schemaName} tableName={tableName} onTableAdd={onTableAdd} />
      )}
    </SchemaListerTreeItem>
  );
});