import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { component } from "../../framework";

type ActionButtonsProps = {
  onConfirm?: () => void;
  disabled?: boolean;
}

export const ActionButtons = component<ActionButtonsProps>(({ onConfirm, disabled }) => {
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
          disabled={disabled}
        >
          Ok
        </Button>}
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
