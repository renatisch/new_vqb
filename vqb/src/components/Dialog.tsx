import {
  Dialog,
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Checkbox,
} from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import QueryBuilderChart from "./vqb/QueryBuilderChart";
import SqlEditorView from "./sqlEditor/SqlEditor";

export default function QueryBuilderDialog() {
  const [editorQuery, setEditorQuery] = useState("");
  const [queryLoading, setQueryLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [dialogView, setDialogView] = useState("vqb");

  return (
    <Dialog
      hideBackdrop
      open={dialogOpen}
      fullWidth
      maxWidth={"md"}
      PaperProps={{ sx: { height: 860, width: 1400 } }}
    >
      <Paper sx={{ background: "#f1f1f1", height: "100%" }}>
        <Box
          display={"flex"}
          sx={{ background: "#0b71c6" }}
          paddingX={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color={"white"} fontSize={14}>
            AI Powered VQB
          </Typography>
          <Box alignItems={"center"}>
            <IconButton>
              <MinimizeIcon
                sx={{ color: "white", paddingRight: 1, height: 20 }}
              />
            </IconButton>
            <IconButton>
              <WebAssetIcon
                sx={{ color: "white", paddingRight: 1, height: 20 }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              <CloseIcon sx={{ color: "white", paddingRight: 1, height: 20 }} />
            </IconButton>
          </Box>
        </Box>
        <Grid container padding={2}>
          <Grid item xs={12} marginY={1}>
            <Box display={"flex"}>
              <input className="winCl-btn" type="button" value="Tables" />
              <input
                className={
                  dialogView === "vqb" ? "winCl-btn-active" : "winCl-btn"
                }
                type="button"
                value="Visual Query Builder"
                onClick={() => {
                  setDialogView("vqb");
                  setQueryLoading(true);
                  setEditorQuery("");
                }}
              />
              <input
                className="winCl-btn"
                type="button"
                value="Stored Procedures"
              />
              <input
                className={
                  dialogView === "sql_editor" ? "winCl-btn-active" : "winCl-btn"
                }
                type="button"
                value="SQL Editor"
                onClick={() => {
                  setDialogView("sql_editor");
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {dialogView === "vqb" ? (
              <QueryBuilderChart />
            ) : (
              <SqlEditorView
                editorQuery={editorQuery}
                setEditorQuery={setEditorQuery}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {dialogView === "vqb" ? (
              <Grid item xs={12}>
                <Box display={"flex"} alignItems={"center"}>
                  <Checkbox />
                  <Typography>Open Visual Query Builder by default</Typography>
                </Box>
              </Grid>
            ) : dialogView === "sql_editor" ? (
              <></>
            ) : (
              <></>
            )}
            <Grid item xs={12}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"end"}
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
                  sx={{
                    width: 100,
                    height: 30,
                    marginRight: 2,
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setDialogOpen(false);
                  }}
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
}
