import { Dispatch, SetStateAction, useState } from "react";
import { format } from "sql-formatter";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import ButtonGroup from '@mui/material/ButtonGroup';

import { component, useQuery } from "../../framework";
import { queryExamples } from "../../constants/querySamples";
import { SqlEditor } from "../stateless/SqlEditor";
import { SqlTooltip } from "../stateless/SqlTooltip";
import { api } from "../../utils/api";
import { QueryPayload } from "../../types/api";
import { QueryStatus } from "../stateless/QueryStatus";

const smartOptions = [
  { option: "Validate", icon: <CheckCircleOutlineOutlinedIcon /> },
  { option: "Explain", icon: <WbIncandescentOutlinedIcon /> },
  { option: "Convert", icon: <LoopOutlinedIcon /> },
  { option: "Optimize", icon: <TuneOutlinedIcon /> },
];

type SqlEditorProps = {
  queryLoading: boolean;
  editorQuery: string;
  setEditorQuery: Dispatch<SetStateAction<string>>;
};

export const SqlEditorView = component<SqlEditorProps>(({ editorQuery, setEditorQuery, queryLoading }) => {
  const [validatedQuery, setValidatedQuery] = useState<QueryPayload>();
  const [explainedQuery, setExplainedQuery] = useState<QueryPayload>();
  const validationRequest = useQuery(api.validateQuery, validatedQuery);
  const explanationRequest = useQuery(api.explainQuery, explainedQuery);

  const handlePass = () => { };
  const handleExplain = () => setExplainedQuery({ technology: "Snowflake", query: editorQuery });
  const handleValidate = () => setValidatedQuery({ technology: "Snowflake", query: editorQuery });

  const handleSuggestionSelect = (query: string) => {
    const formattedQuery = format(query, { language: "snowflake" });
    setEditorQuery(formattedQuery);
    // setError(false);
  };

  const tooltipOnclick = (option: string) => {
    option === "Validate"
      ? handleValidate()
      : option === "Explain"
        ? handleExplain()
        : handlePass();
  }

  return (
    <Box padding={2} paddingLeft={0} display="flex" flexDirection="column">
      <SqlEditor query={editorQuery} queryLoading={queryLoading} setQuery={setEditorQuery} />
      <Box
        height={20}
        marginTop={1}
        marginRight={0.5}
        display="flex"
        alignItems="center"
        justifyContent="end"
      >
        <ButtonGroup>
          {smartOptions.map((option, index) =>
            <SqlTooltip title={option.option} key={index} onClick={() => tooltipOnclick(option.option)} icon={option.icon} />)}
        </ButtonGroup>
      </Box>

      <QueryStatus
        status={validationRequest.status}
        message={validationRequest.data || "Query is Valid"}
        severity={validationRequest.data ? "error" : "success"}
      />
      <QueryStatus
        status={explanationRequest.status}
        message={explanationRequest.data}
        severity="info"
      />

      {/* {error && errorType === "emptyQuery" ? (
        <Box height={112}>
          <Alert severity="warning" sx={{ margin: 1, padding: 1 }}>
            <Typography marginLeft={1}>{helperText}</Typography>
          </Alert>
        </Box>
      ) : error && errorType === "invalidQuery" ? (
        <Alert severity="error" sx={{ margin: 1, padding: 1 }}>
          <Typography marginLeft={1}>
            Invalid query. Please use the following query instead.
          </Typography>
          <Box margin={0.5}>
            <Stack spacing={1} direction="row">
              <Chip
                label={validatedQuery}
                color="primary"
                variant="outlined"
                onClick={() => handleSuggestionSelect(validatedQuery)}
                icon={
                  <Tooltip title={validatedQuery}>
                    <IconButton>
                      <HelpOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </Stack>
          </Box>
        </Alert>
      ) : !error &&
        !loading &&
        helperText.length < 1 &&
        validatedQuery.length > 0 ? (
        <Box height={112}>
          <Alert severity="success" sx={{ margin: 1, padding: 1 }}>
            <Typography marginLeft={1}>Valid query</Typography>
          </Alert>
        </Box>
      ) : !error && !loading && helperText.length > 1 ? (
        <Box height={112}>
          <Alert severity="info" sx={{ margin: 1, padding: 1 }}>
            <Typography marginLeft={1}>{helperText}</Typography>
          </Alert>
        </Box>
      ) : (
        <Box height={112}></Box>
      )} */}
      <Box display="flex" flexDirection="column" marginTop={0.5}>
        <Typography fontSize={15} fontWeight={550} marginBottom={1}>
          Query suggestions:
        </Typography>
        {queryExamples.map((query, index) => {
          return (
            <Box margin={0.5} key={index}>
              <Stack spacing={1} direction="row">
                <Chip
                  label={query.query}
                  color="primary"
                  variant="outlined"
                  onClick={() => handleSuggestionSelect(query.query)}
                  icon={
                    <Tooltip title={query.query}>
                      <IconButton>
                        <HelpOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
              </Stack>
            </Box>
          );
        })}
      </Box>
      <Box display="flex" alignItems="center" marginTop={2}>
        <Checkbox />
        <Typography>Open SQL Editor view by default</Typography>
        <Button
          variant="outlined"
          disabled
          sx={{
            marginLeft: 2,
            width: 150,
            height: 30,
            marginRight: 2,
            background: "white",
            textTransform: "none",
          }}
        >
          Test Query
        </Button>
      </Box>
    </Box>
  );
});
