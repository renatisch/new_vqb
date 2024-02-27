import { useEffect } from "react";
import { format } from "sql-formatter";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

import { component, useQuery, useStateDomain } from "../../../framework";
import { queryExamples } from "../../../constants/querySamples";
import { SqlEditor } from "../../stateless/SqlEditor";
import { SqlTooltip } from "../../stateless/SqlTooltip";
import { QueryStatus } from "../../stateless/QueryStatus";
import { QuerySuggestion } from "../../stateless/QuerySuggestion";
import { ActionButtons } from "../../stateless/ActionButtons";
import { Query, Table } from "../../../types/types";
import { api } from "../../../utils/api";

type SqlEditorProps = {
  hidden?: boolean;
  query: Query;
  tables: Table[];
  technology?: string;
};

export const SqlEditorView = component<SqlEditorProps>(({ hidden, tables, technology, query }) => {
  const [usedQuery, setUsedQuery] = useStateDomain<Query>(undefined, [query, technology, tables]);
  const selectQuery = useQuery(api.getQuery, usedQuery, tables, technology);
  const [editorQuery, setEditorQuery] = useStateDomain<string>(selectQuery.data, [selectQuery.data]);
  const [validatedQuery, setValidatedQuery] = useStateDomain<string>(undefined, [editorQuery]);
  const [explainedQuery, setExplainedQuery] = useStateDomain<string>(undefined, [editorQuery]);
  const [convertedQuery, setConvertedQuery] = useStateDomain<string>(undefined, [editorQuery]);
  const validationRequest = useQuery(api.validateQuery, technology, validatedQuery);
  const explanationRequest = useQuery(api.explainQuery, technology, explainedQuery);
  const convertionRequest = useQuery(api.convertQuery, technology, convertedQuery);
  const isEmptyQuery = !editorQuery || editorQuery === "";
  const convertionResult = convertionRequest.data;

  const handleSuggestionSelect = (query: string) => {
    const formattedQuery = format(query, { language: "snowflake" });
    setEditorQuery(formattedQuery);
  };

  useEffect(() => {
    if (convertionResult) {
      setEditorQuery(convertionResult);
    }
  }, [convertionResult]);

  return (
    <Box padding={2} paddingLeft={0} display="flex" flexDirection="column" style={{ height: '100%', display: hidden ? 'none' : 'block' }}>
      <Button variant="contained" sx={{ height: 30, marginRight: 2 }} onClick={() => setUsedQuery(query)}>
        Generate query
      </Button>
      <SqlEditor query={editorQuery} queryLoading={selectQuery.isLoading} setQuery={setEditorQuery} />
      <Box
        height={20}
        marginTop={1}
        marginRight={0.5}
        display="flex"
        alignItems="center"
        justifyContent="end"
      >
        <ButtonGroup>
          <SqlTooltip disabled={isEmptyQuery} title='Validate' onClick={() => setValidatedQuery(editorQuery)} icon={<CheckCircleOutlineOutlinedIcon />} />
          <SqlTooltip disabled={isEmptyQuery} title='Explain' onClick={() => setExplainedQuery(editorQuery)} icon={<WbIncandescentOutlinedIcon />} />
          <SqlTooltip disabled={isEmptyQuery} title={`Convert to ${technology} format`} onClick={() => setConvertedQuery(editorQuery)} icon={<LoopOutlinedIcon />} />
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
      <QueryStatus
        status={convertionRequest.status}
      />
      <Box display="flex" flexDirection="column" marginTop={0.5}>
        <Typography fontSize={15} fontWeight={550} marginBottom={1}>
          Query suggestions:
        </Typography>
        {queryExamples.map(({ query }, i) =>
          <QuerySuggestion key={i} query={query} onClick={() => handleSuggestionSelect(query)} />)}
      </Box>
      <ActionButtons onConfirm={!isEmptyQuery ? () => window.hostFunctions?.onOk(editorQuery) : undefined}/>
    </Box>
  );
});
