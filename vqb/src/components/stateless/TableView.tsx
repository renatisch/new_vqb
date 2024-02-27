import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { component } from "../../framework";
import { Column } from "../../types/types";
import { DataTypeIcon } from "./DataTypeIcon";

type TableViewProps = {
  column: Column;
  onClick: () => void;
}

export const TableView = component<TableViewProps>(({ column, onClick }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="start" height={16}>
      <Checkbox
        checked={column.selected && true}
        onClick={onClick}
        size="small"
        sx={{ transform: 'scale(0.5)', padding: 0 }}
      />
      <DataTypeIcon dataType={column.objectType} />
      <Typography fontSize={9} marginLeft={1}>
        {column.name}
      </Typography>
    </Box>
  );
});