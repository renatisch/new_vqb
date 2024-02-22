import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TreeItem, TreeItemProps, treeItemClasses } from "@mui/x-tree-view/TreeItem";

import { component } from "../../framework";

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon: React.ReactElement;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 5,
    paddingTop: 5,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

export const SchemaListerTreeItem = component<StyledTreeItemProps>(({ bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, colorForDarkMode, bgColorForDarkMode, ...other }) => {
  const theme = useTheme();

  return (
    <StyledTreeItemRoot label={
      <Box sx={{ display: "flex", alignItems: "center", pr: 0 }} >
        {LabelIcon}
        <Typography variant="body2" sx={{ fontWeight: "inherit", flexGrow: 1, marginLeft: 1 }}>
          {labelText}
        </Typography>
        <Typography variant="caption" color="inherit">
          {labelInfo}
        </Typography>
      </Box>
    }
      style={{
        "--tree-view-color": theme.palette.mode !== "dark" ? color : colorForDarkMode,
        "--tree-view-bg-color": theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
      }}
      {...other}
    />
  );
});
