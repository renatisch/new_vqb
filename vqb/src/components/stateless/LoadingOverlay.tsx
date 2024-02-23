import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import { component } from "../../framework";

export const LoaderOverlay = component(() =>
  <Box sx={{ width: "100%", height: "30px" }}>
    <Typography variant="subtitle2">Query is loading...</Typography>
    <LinearProgress />
  </Box>
);
