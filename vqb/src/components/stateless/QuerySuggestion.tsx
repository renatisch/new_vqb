import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/system/Box";

import { component } from "../../framework";
import { TooltipLabel } from "./TooltipLabel";

type QuerySuggestionProps = {
  query: string;
  onClick: () => void;
}

export const QuerySuggestion = component<QuerySuggestionProps>(({ query, onClick }) =>
  <Box margin={0.5}>
    <Stack spacing={1} direction="row">
      <Chip
        label={query}
        color="primary"
        variant="outlined"
        onClick={onClick}
        icon={<TooltipLabel title={query} />}
      />
    </Stack>
  </Box>
);
