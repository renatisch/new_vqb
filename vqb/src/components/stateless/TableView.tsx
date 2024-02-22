import { GoNumber } from "react-icons/go";
import { MdAbc } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { component } from "../../framework";

type TableViewProps = {
  column: any;
  onClick: () => void;
}

export const TableView = component<TableViewProps>(({ column, onClick }) => {
  return (
    <Grid item xs={12}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" justifyContent="start">
          <Checkbox
            checked={column.selected && true}
            onClick={onClick}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 10 } }}
          />
          {column.dataType === "string" ? (
            <MdAbc height={10} />
          ) : column.dataType === "integer" ? (
            <GoNumber height={10} />
          ) : (
            <GoNumber height={10} />
          )}
          <Typography fontSize={8} marginLeft={1} textTransform="uppercase">
            {column.name}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
});