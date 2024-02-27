import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { component } from "../../framework";

type QueryStatusProps = {
  status: 'success' | 'error' | 'loading' | 'idle';
  severity?: 'error' | 'info' | 'success' | 'warning';
  message?: string;
}

export const QueryStatus = component<QueryStatusProps>(({ status, severity, message }) => {
  if (status === 'idle' || status === 'loading') {
    return null;
  }

  return (
    <Box sx={{ marginBottom: 1 }}>
      {
        status === 'success' ? !message ? null :
          <Alert severity={severity}>
            <Typography marginLeft={1}>{message}</Typography>
          </Alert> :
          status === 'error' ?
            <Alert severity='error'>
              <Typography marginLeft={1}>{'HTTP request failed'}</Typography>
            </Alert> : ""
      }
    </Box>
  );
});