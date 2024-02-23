import { useState } from "react";
import { Node, Edge } from "reactflow";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import MinimizeIcon from "@mui/icons-material/Minimize";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CloseIcon from "@mui/icons-material/Close";

import { component } from "../../framework";
import { Query, Table } from "../../types/types";
import { endpoints } from "../../utils/endpoints";
import { QueryBuilderChart } from "../atomic/QueryBuilderChart";
import { SqlEditorView } from "./SqlEditorView";
import { TechnologySelector } from "../atomic/TechnologySelector";

export const QueryBuilderDialog = component(() => {
  const [editorQuery, setEditorQuery] = useState("");
  const [queryLoading, setQueryLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [dialogView, setDialogView] = useState("vqb");
  const [technology, setTechnology] = useState("Snowflake");
  // const selectQuery = useQuery(api.queries.select, selectQueryInput);

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
    const columns = table.columns?.filter((column) => {
      return column.selected;
    });
    const selectedColumns = columns?.map((column) => {
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
    const technology = "Snowflake";
    if (queryObject.action.length > 0) {
      const payload = {
        technology: technology,
        join_type: "left",
        databases: [queryObject.primaryDatabase, queryObject.secondaryDatabase],
        schemas: [queryObject.primarySchema, queryObject.secondarySchema],
        tables: [queryObject.primaryTable, queryObject.secondaryTable],
        left_table_column: queryObject.primaryColumn,
        right_table_column: queryObject.secondaryColumn,
      };
      endpoints.queries.join(payload)
        .then((response) => {
          const recievedQuery = response["queries"]["query"];
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
      const payload = formatTable(tables[0]);
      endpoints.queries.select(payload)
        .then((response) => {
          const recievedQuery = response["query"];
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
      maxWidth="md"
      PaperProps={{ sx: { height: 860, width: 1400 } }}
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
        <Grid container padding={2}>
          <Grid item xs={12} marginY={1}>
            <Box display="flex">
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
          {dialogView === "vqb" && (
            <Grid item xs={12}>
              <Box marginY={1}>
                <TechnologySelector
                  technology={technology}
                  setTechnology={setTechnology}
                />
              </Box>
            </Grid>
          )}
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
                technology={technology}
                queryLoading={queryLoading}
                editorQuery={editorQuery}
                setEditorQuery={setEditorQuery}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {dialogView === "vqb" ? (
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
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
});
