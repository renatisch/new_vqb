import { NodeProps } from "reactflow";
import { Card, Grid, Box, Typography, Accordion } from "@mui/material";
import { CiViewTable } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
import { MdAbc } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Handle, Position } from "reactflow";
import { HandleProps } from "reactflow";
import { ChartTable } from "./schemaLister/types";
import { useContext } from "react";
import { TreeProps } from "./schemaLister/types";
import { QueryBuilderContext } from "../QueryBuilderChart";

export const TargetHandleWithValidation = ({ position, type }: HandleProps) => (
  <Handle
    type={type}
    position={position}
    onConnect={(params) => console.log("handle onConnect", params)}
    style={{ background: "blue" }}
  />
);

export default function DbNode({ data }: NodeProps) {
  const table: ChartTable = data;
  const { query, setQuery, setTables, tables } =
    useContext(QueryBuilderContext);
  const handleCheck = (tableName: string, column: string) => {
    if (table.handleType === "source") {
      setQuery({
        ...query,
        primaryDatabase: table.database,
        primarySchema: table.schema,
        primaryTable: tableName,
        primaryColumn: column,
      });
    } else {
      setQuery({
        ...query,
        secondaryDatabase: table.database,
        secondarySchema: table.schema,
        secondaryTable: tableName,
        secondaryColumn: column,
      });
    }
    tables.map((eachTable) => {
      if (eachTable.tableName === tableName) {
        eachTable.columns?.map((each: TreeProps) => {
          if (each.name === column) {
            each.selected = !each.selected;
          }
        });
        eachTable.expanded = true;
      }
    });
    setTables(tables);
  };

  return (
    <>
      <Card sx={{ maxWidth: 200 }}>
        <Handle
          id={table.handleType === "source" ? "a" : "b"}
          type={table.handleType === "source" ? "source" : "target"}
          position={
            table.handleType === "source" ? Position.Right : Position.Left
          }
          isConnectable={true}
        />
        <Box height={8} bgcolor={"#07c08d"} />
        <Accordion disableGutters expanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Box display={"flex"} alignItems={"center"}>
              <CiViewTable />
              <Typography marginLeft={1} fontSize={10}>
                {table.tableName}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "#f8fafb" }}>
            <Grid container>
              <Grid item xs={12}>
                <Box bgcolor={"#f8fafb"} paddingRight={2}>
                  <Grid container>
                    {table.columns.map((column: any, index: any) => {
                      return (
                        <Grid item xs={12} key={index}>
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"start"}
                            >
                              <Checkbox
                                checked={column.selected && true}
                                onClick={() =>
                                  handleCheck(table.tableName, column.name)
                                }
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 10 } }}
                              />
                              {column.dataType === "string" ? (
                                <MdAbc height={10} />
                              ) : column.dataType === "integer" ? (
                                <GoNumber height={10} />
                              ) : (
                                <GoNumber height={10} />
                              )}
                              <Typography
                                fontSize={8}
                                marginLeft={1}
                                textTransform={"uppercase"}
                              >
                                {column.name}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
    </>
  );
}
