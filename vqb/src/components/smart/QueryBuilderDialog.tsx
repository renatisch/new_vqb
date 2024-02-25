import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MinimizeIcon from "@mui/icons-material/Minimize";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CloseIcon from "@mui/icons-material/Close";

import { component } from "../../framework";
import { Query, Table } from "../../types/types";
import { VisualQueryBuilder } from "./Tabs/VisualQueryBuilder";
import { SqlEditorView } from "./Tabs/SqlEditorView";

export const QueryBuilderDialog = component(() => {
  const [editorQuery, setEditorQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(true);
  const [content, setContent] = useState(0);
  const [technology, setTechnology] = useState("Snowflake");
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

  return (
    <Dialog
      hideBackdrop
      open={dialogOpen}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { height: 900, width: 1400 } }}
    >
      <Paper sx={{ background: "#f1f1f1", height: "100%" }}>
        <Box display="flex" sx={{ background: "#0b71c6" }} paddingX={2} justifyContent="space-between" alignItems="center">
          <Typography color="white" fontSize={14}>
            AI Powered VQB
          </Typography>
          <Box alignItems="center">
            <IconButton>
              <MinimizeIcon sx={{ color: "white", paddingRight: 1, height: 20 }} />
            </IconButton>
            <IconButton>
              <WebAssetIcon sx={{ color: "white", paddingRight: 1, height: 20 }} />
            </IconButton>
            <IconButton onClick={() => setDialogOpen(false)} >
              <CloseIcon sx={{ color: "white", paddingRight: 1, height: 20 }} />
            </IconButton>
          </Box>
        </Box>
        <Grid container>
          <Tabs value={content} onChange={(_, val) => setContent(val)} centered variant='fullWidth' style={{ width: '100%' }}>
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
              technology={technology}
              setTechnology={setTechnology}
            />
            <SqlEditorView
              hidden={content !== 1}
              technology={technology}
              query={query}
              tables={tables}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                paddingRight={2}
              >
                <Button
                  variant="contained"
                  sx={{ width: 100, height: 30, marginRight: 2 }}
                >
                  Ok
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: 100, height: 30, marginRight: 2, textTransform: "none" }}
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
});
