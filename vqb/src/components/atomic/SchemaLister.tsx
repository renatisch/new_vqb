import { useState } from "react";
import Box from "@mui/material/Box";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { CircularProgress } from "@mui/material";

import { component, useQuery } from "../../framework";
import { MinusSquare, PlusSquare } from "../stateless/icons";
import { api } from "../../utils/api";
import { DbNode } from "../smart/Tree/DbNode";

export type SchemaListerProps = {
  onTableAdd: (queryTable: any) => void;
}

export const SchemaLister = component<SchemaListerProps>(({ onTableAdd }) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const dbs = useQuery(api.getDbList);

  const handleToggle = (_: React.SyntheticEvent, nodeIds: string[]) => setExpanded(nodeIds);

  if (dbs.isLoading) {
    return <CircularProgress size={16} />;
  }

  return (
    <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 500, padding: 1 }}>
      <TreeView aria-label="customized" defaultCollapseIcon={<MinusSquare />} defaultExpandIcon={<PlusSquare />} onNodeToggle={handleToggle}>
        {dbs.data?.map(db =>
          <DbNode key={db} dbName={db} isExpanded={expanded.includes(db)} onTableAdd={onTableAdd} />
        )}
      </TreeView>
    </Box>
  );
});
