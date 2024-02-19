import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function LoaderOverlay() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle2">Query is loading...</Typography>
      <LinearProgress />
    </Box>
  );
}
