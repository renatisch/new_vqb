import { ReactElement } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { component } from "../../framework";
import CircularProgress from "@mui/material/CircularProgress";

type SqlTooltipProps = {
  icon: ReactElement;
  disabled: boolean;
  isLoading?: boolean;
  title: string;
  onClick: () => void;
}

export const SqlTooltip = component<SqlTooltipProps>(({ title, icon, onClick, disabled, isLoading }) => {
  if (isLoading) {
    return (
      <IconButton sx={{ marginRight: 0, width: 36, height: 36 }} disabled>
        <CircularProgress size={21} sx={{ position: 'relative', left: 1, top: -1 }} />
      </IconButton>
    );
  }

  if (disabled) {
    return (
      <IconButton sx={{ marginRight: 0, width: 36, height: 36 }} disabled>
        {icon}
      </IconButton>
    );
  }

  return (
    <Tooltip title={title}>
      <IconButton sx={{ marginRight: 0, width: 36, height: 36 }} onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
});