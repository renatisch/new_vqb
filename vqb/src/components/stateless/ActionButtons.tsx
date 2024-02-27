import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { component } from "../../framework";

type ActionButtonsProps = {
  onConfirm?: () => void;
}

export const ActionButtons = component<ActionButtonsProps>(({ onConfirm }) => {
  return (
    <Box
      marginTop={1}
      marginBottom={1}
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
  );
});
