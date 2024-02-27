import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { component } from "../../framework";

type QueryStatusProps = {
  status: 'success' | 'error' | 'loading' | 'idle';
  severity?: 'error' | 'info' | 'success' | 'warning';
  message?: string;
}

export const QueryStatus = component<QueryStatusProps>(({ status, severity, message }) => {
  if (status === 'idle') {
    return null;
  }

  return (
    <Box sx={{ marginBottom: 1 }}>
      {
        status === 'loading' ?
          <CircularProgress size={21} sx={{ padding: 1.7, marginLeft: 0.6 }} /> :
          status === 'success' ? !message ? null :
            <Alert severity={severity}>
              <Typography marginLeft={1}>{message}</Typography>
            </Alert> :
            status === 'error' ?
            <Alert severity={severity}>
              <Typography marginLeft={1}>{'HTTP request failed'}</Typography>
            </Alert> : ""
      }
    </Box>
  );
});