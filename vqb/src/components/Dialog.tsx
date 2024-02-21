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
import { Node, Edge } from "reactflow";
import { Query, Table } from "./types";
import axios from "axios";
import { format } from "sql-formatter";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 20000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export default function QueryBuilderDialog() {
  const [editorQuery, setEditorQuery] = useState("");
  const [queryLoading, setQueryLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [dialogView, setDialogView] = useState("vqb");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
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
  const [tables, setTables] = useState<Table[]>([
    {
      database: "",
      schema: "",
      tableName: "",
      columns: [],
    },
  ]);

  const formatTable = (table: Table) => {
    let columns = table.columns?.filter((column) => {
      return column.selected;
    });
    let selectedColumns = columns?.map((column) => {
      return column.name;
    });
    return {
      technology: "Snowflake",
      database: table.database,
      table_schema: table.schema,
      table: table.tableName,
      columns: selectedColumns,
    };
  };
  const generateQuery = (queryObject: Query) => {
    let technology = "Snowflake";
    if (queryObject.action.length > 0) {
      let payload = {
        technology: technology,
        join_type: "left",
        databases: [queryObject.primaryDatabase, queryObject.secondaryDatabase],
        schemas: [queryObject.primarySchema, queryObject.secondarySchema],
        tables: [queryObject.primaryTable, queryObject.secondaryTable],
        left_table_column: queryObject.primaryColumn,
        right_table_column: queryObject.secondaryColumn,
      };
      instance
        .post("/queries/join", payload)
        .then((response) => {
          console.log(response);
          let recievedQuery = response.data["queries"]["query"];
          // const formattedQuery = format(response.data["queries"]["query"], {
          //   language: "snowflake",
          //   keywordCase: "upper",
          // });
          setEditorQuery(recievedQuery);
          setQueryLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let payload = formatTable(tables[0]);
      instance
        .post("/queries/select", payload)
        .then((response) => {
          console.log(response);
          let recievedQuery = response.data["query"];
          // const formattedQuery = format(response.data["query"], {
          //   language: "snowflake",
          //   keywordCase: "upper",
          // });
          setEditorQuery(recievedQuery);
          setQueryLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const switchToSQLEditor = () => {
    if (tables.length < 1) {
      setDialogView("sql_editor");
      setQueryLoading(false);
    } else {
      console.log("run");
      generateQuery(query);
      setDialogView("sql_editor");
    }
  };
  const switchToVQB = () => {
    setDialogView("vqb");
    setQueryLoading(true);
    setEditorQuery("");
  };

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
                  switchToVQB();
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
                  switchToSQLEditor();
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {dialogView === "vqb" ? (
              <QueryBuilderChart
                nodes={nodes}
                edges={edges}
                setNodes={setNodes}
                setEdges={setEdges}
                editorQuery={editorQuery}
                setEditorQuery={setEditorQuery}
                queryLoading={queryLoading}
                setQueryLoading={setQueryLoading}
                query={query}
                setQuery={setQuery}
                tables={tables}
                setTables={setTables}
              />
            ) : (
              <SqlEditorView
                queryLoading={queryLoading}
                setQueryLoading={setQueryLoading}
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
