import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { component, useQuery } from "../../framework";
import { Query, Table } from "../../types/types";
import { api } from "../../utils/api";
import { VisualQueryBuilder } from "./Tabs/VisualQueryBuilder";
import { SqlEditorView } from "./Tabs/SqlEditorView";

export const QueryBuilderDialog = component(() => {
  const [editorQuery, setEditorQuery] = useState("");
  const [content, setContent] = useState(0);
  const [tables, setTables] = useState<Table[]>([]);
  const [query, setQuery] = useState<Query>({
    primaryDatabase: "",
    primarySchema: "",
    primaryTable: "",
    primaryColumn: "",
    secondaryDatabase: "",
    secondarySchema: "",
    secondaryTable: "",
    secondaryColumn: "",
    action: "",
  });

  const initialData = useQuery(api.getInitialData);

  return (
      <Paper sx={{ background: "#f5f8fc", height: 700, width: "100%", overflow: 'auto' }}>
        <Grid container>
          <Tabs value={content} onChange={(_, val) => setContent(val)} centered variant='fullWidth' style={{ width: '100%', background: '#e3eaf3' }}>
            <Tab label="Visual Query Builder" />
            <Tab label="SQL Editor" />
          </Tabs>
          <Grid item xs={12} padding={2}>
            <VisualQueryBuilder
              hidden={content !== 0}
              editorQuery={editorQuery}
              setEditorQuery={setEditorQuery}
              query={query}
              setQuery={setQuery}
              tables={tables}
              setTables={setTables}
              databases={initialData.data?.databases}
            />
            <SqlEditorView
              hidden={content !== 1}
              technology={initialData.data?.technology}
              query={query}
              tables={tables}
            />
          </Grid>
        </Grid>
      </Paper>
  );
});
