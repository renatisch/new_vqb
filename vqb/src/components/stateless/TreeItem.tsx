import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TreeItem, TreeItemProps, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import CircularProgress from "@mui/material/CircularProgress";
import { TreeView } from "@mui/x-tree-view/TreeView";

import { component } from "../../framework";
import { MinusSquare, PlusSquare } from "./icons";

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
  isLoadingChildren?: boolean;
  controlIcon?: React.ReactElement;
  noExpand?: boolean;
  onNodeToggle?: (nodeIds: string[]) => void;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderRadius: theme.spacing(2),
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

export const SchemaListerTreeItem = component<StyledTreeItemProps>(({ children, noExpand, bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, colorForDarkMode, bgColorForDarkMode, isLoadingChildren, controlIcon, onNodeToggle, ...other }) => {
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
        {isLoadingChildren ? <CircularProgress size={12} /> : controlIcon}
      </Box>
    }
      style={{
        "--tree-view-color": theme.palette.mode !== "dark" ? color : colorForDarkMode,
        "--tree-view-bg-color": theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
      }}
      {...other}
    >
      {noExpand ? children :
        <TreeView aria-label="customized" defaultCollapseIcon={<MinusSquare />} defaultExpandIcon={<PlusSquare />} onNodeToggle={(_: any, v) => onNodeToggle?.(v)}>
          {children}
        </TreeView>
      }
    </StyledTreeItemRoot>
  );
});
