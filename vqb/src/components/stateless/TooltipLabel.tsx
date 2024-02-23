import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { component } from "../../framework";

type TooltipLabelProps = {
  title: string;
}

export const TooltipLabel = component<TooltipLabelProps>(({ title }) =>
  <Tooltip title={title}>
    <IconButton>
      <HelpOutlineOutlinedIcon />
    </IconButton>
  </Tooltip>
);