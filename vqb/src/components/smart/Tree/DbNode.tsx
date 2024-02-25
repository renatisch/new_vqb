import { useState } from "react";
import { FaDatabase } from "react-icons/fa";

import { component, useProp, useQuery } from "../../../framework";
import { api } from "../../../utils/api";
import { SchemaListerTreeItem } from "../../stateless/TreeItem";
import { SchemaNode } from "./SchemaNode";

type DbNodeProps = {
  dbName: string;
  isExpanded: boolean;
  onTableAdd: (queryTable: any) => void;
};

export const DbNode = component<DbNodeProps>(({ isExpanded, dbName, onTableAdd }) => {
  const queryDbName = isExpanded ? dbName : undefined;
  const subNodes = useQuery(api.getSchemaList, queryDbName);
  const [expanded, setExpanded] = useState<string[]>([]);
  const schemaNames = useProp(subNodes.data);

  return (
    <SchemaListerTreeItem nodeId={dbName} labelText={dbName} labelIcon={<FaDatabase />} isLoadingChildren={subNodes.isLoading} onNodeToggle={setExpanded}>
      {schemaNames?.map(schemaName =>
        <SchemaNode key={schemaName} isExpanded={expanded.includes(schemaName)} dbName={dbName} schemaName={schemaName} onTableAdd={onTableAdd} />
      )}
    </SchemaListerTreeItem>
  );
});