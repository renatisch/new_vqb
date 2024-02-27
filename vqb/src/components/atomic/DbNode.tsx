import { useContext, useState } from "react";
import { CiViewTable } from "react-icons/ci";
import { Handle, Position } from "reactflow";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { component } from "../../framework";
import { ChartTable, Table } from "../../types/types";
import { TreeProps } from "../../types/types";
import { QueryBuilderContext } from "../../contexts/queryBuilderContext";
import { TableView } from "../stateless/TableView";

type DbNodeProps = {
  data: ChartTable;
}

export const DbNode = component<DbNodeProps>(({ data }) => {
  const { query, setQuery, setTables, tables } = useContext(QueryBuilderContext);
  const [expanded, setExpanded] = useState(true);

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
    const newTables = tables.map<Table>((eachTable) => {
      if (eachTable.tableName === tableName) {
        return {
          ...eachTable,
          columns: eachTable.columns?.map((each: TreeProps) => {
            if (each.name === column) {
              return { ...each, selected: !each.selected };
            } else {
              return each;
            }
          }),
          expanded: true
        };
      } else {
        return eachTable;
      }
    });
    setTables(newTables);
  };

  return (
    <Card>
      <Handle
        id={data.handleType === "source" ? "a" : "b"}
        type={data.handleType === "source" ? "source" : "target"}
        position={data.handleType === "source" ? Position.Right : Position.Left}
        isConnectable
      />
      <Box height={8} bgcolor="#07c08d" />
      <Accordion disableGutters expanded={expanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setExpanded(!expanded)} />}
          aria-controls="panel1d-content"
          id="panel1d-header"
          style={{ height: 24, minHeight: 24, padding: 6 }}
        >
          <CiViewTable />
          <Typography marginLeft={1} fontSize={10}>
            {data.tableName}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#f8fafb", padding: 0.5, paddingRight: 1 }}>
          {data.columns.map(column =>
            <TableView key={column.id} column={column} onClick={() => handleCheck(data.tableName, column.name)} />)}
        </AccordionDetails>
      </Accordion>
    </Card>
  );
});
