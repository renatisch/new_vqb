import { ReactElement } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { component } from "../../framework";

type SqlTooltipProps = {
  icon: ReactElement;
  disabled: boolean;
  title: string;
  onClick: () => void;
}

export const SqlTooltip = component<SqlTooltipProps>(({ title, icon, onClick, disabled }) => {
  if (disabled) {
    return (
      <IconButton sx={{ marginRight: 0 }} disabled>
        {icon}
      </IconButton>
    );
  }

  return (
    <Tooltip title={title}>
      <IconButton sx={{ marginRight: 0 }} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
});