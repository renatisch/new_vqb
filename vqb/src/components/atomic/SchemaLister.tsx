import { useState } from "react";
import Box from "@mui/material/Box";
import { TreeView } from "@mui/x-tree-view/TreeView";
import CircularProgress from "@mui/material/CircularProgress";

import { component } from "../../framework";
import { TableQuery } from "../../types/types";
import { MinusSquare, PlusSquare } from "../stateless/icons";
import { DbNode } from "../smart/Tree/DbNode";

export type SchemaListerProps = {
  onTableAdd: (queryTable: TableQuery) => void;
  databases: string[] | undefined;
}

export const SchemaLister = component<SchemaListerProps>(({ onTableAdd, databases }) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleToggle = (_: React.SyntheticEvent, nodeIds: string[]) => setExpanded(nodeIds);

  if (!databases) {
    return <CircularProgress size={16} />;
  }

  return (
    <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 500, padding: 1 }}>
      <TreeView style={{ padding: 0 }} aria-label="customized" defaultCollapseIcon={<MinusSquare />} defaultExpandIcon={<PlusSquare />} onNodeToggle={handleToggle}>
        {databases?.map(db =>
          <DbNode key={db} dbName={db} isExpanded={expanded.includes(db)} onTableAdd={onTableAdd} />
        )}
      </TreeView>
    </Box>
  );
});
