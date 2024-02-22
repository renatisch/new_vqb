import { useContext } from "react";
import { CiViewTable } from "react-icons/ci";
import { Handle, Position } from "reactflow";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { component } from "../../framework";
import { ChartTable } from "../../types/types";
import { TreeProps } from "../../types/types";
import { QueryBuilderContext } from "../../contexts/queryBuilderContext";
import { TableView } from "../stateless/TableView";

type DbNodeProps = {
  data: ChartTable;
}

export const DbNode = component<DbNodeProps>(({ data }) => {
  const { query, setQuery, setTables, tables } = useContext(QueryBuilderContext);
  const handleCheck = (tableName: string, column: string) => {
    if (data.handleType === "source") {
      setQuery({
        ...query,
        primaryDatabase: data.database,
        primarySchema: data.schema,
        primaryTable: tableName,
        primaryColumn: column,
      });
    } else {
      setQuery({
        ...query,
        secondaryDatabase: data.database,
        secondarySchema: data.schema,
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
          id={data.handleType === "source" ? "a" : "b"}
          type={data.handleType === "source" ? "source" : "target"}
          position={
            data.handleType === "source" ? Position.Right : Position.Left
          }
          isConnectable={true}
        />
        <Box height={8} bgcolor="#07c08d" />
        <Accordion disableGutters expanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Box display="flex" alignItems="center">
              <CiViewTable />
              <Typography marginLeft={1} fontSize={10}>
                {data.tableName}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "#f8fafb" }}>
            <Grid container>
              <Grid item xs={12}>
                <Box bgcolor="#f8fafb" paddingRight={2}>
                  <Grid container>
                    {data.columns.map((column: any, i) =>
                      <TableView key={i} column={column} onClick={() => handleCheck(data.tableName, column.name)} />)}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
    </>
  );
});
