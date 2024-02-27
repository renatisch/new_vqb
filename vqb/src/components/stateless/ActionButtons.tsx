import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { component } from "../../framework";

type ActionButtonsProps = {
  onConfirm?: () => void;
}

export const ActionButtons = component<ActionButtonsProps>(({ onConfirm }) => {
  return (
    <Grid item xs={12}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
      >
        {onConfirm &&
          <Button
            variant="contained"
            sx={{ width: 100, height: 30, marginLeft: 2 }}
            onClick={onConfirm}
          >
            Ok
          </Button>
        }
        <Button
          variant="outlined"
          sx={{ width: 100, height: 30, marginLeft: 2, textTransform: "none" }}
          onClick={() => window.hostFunctions?.onCancel()}
        >
          Cancel
        </Button>
      </Box>
    </Grid>
  );
});
