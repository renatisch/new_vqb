import { ReactElement } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { component } from "../../framework";

type SqlTooltipProps = {
  icon: ReactElement;
  title: string;
  onClick: () => void;
}

export const SqlTooltip = component<SqlTooltipProps>(({ title, icon, onClick }) =>
  <Tooltip title={title}>
    <IconButton
      sx={{ marginRight: 0 }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  </Tooltip>
);