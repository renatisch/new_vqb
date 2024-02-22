import { FC } from "react";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export const LoaderOverlay: FC = () => {
  return (
    <Box sx={{ width: "100%", height: "30px" }}>
      <Typography variant="subtitle2">Query is loading...</Typography>
      <LinearProgress />
    </Box>
  );
};
