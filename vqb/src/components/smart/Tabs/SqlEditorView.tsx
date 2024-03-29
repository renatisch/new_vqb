import { useEffect } from "react";
import { UseQueryResult } from "react-query";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

import { component, useQuery, useStateDomain } from "../../../framework";
import { Query, Table } from "../../../types/types";
import { InitialData } from "../../../types/api";
import { queryExamples } from "../../../constants/querySamples";
import { api } from "../../../utils/api";
import { utils } from "../../../utils/utils";
import { SqlEditor } from "../../stateless/SqlEditor";
import { SqlTooltip } from "../../stateless/SqlTooltip";
import { QueryStatus } from "../../stateless/QueryStatus";
import { QuerySuggestion } from "../../stateless/QuerySuggestion";
import { ActionButtons } from "../../stateless/ActionButtons";

type SqlEditorProps = {
  hidden?: boolean;
  query: Query;
  tables: Table[];
  initialData: UseQueryResult<InitialData>;
};

export const SqlEditorView = component<SqlEditorProps>(({ hidden, tables, initialData, query }) => {
  const technology = initialData.data?.technology;
  const initialQuery = initialData.data?.initialQuery;
  const [usedQuery, setUsedQuery] = useStateDomain<Query>(undefined, [query, technology, tables]);
  const generatedQuery = useQuery(api.getQuery, usedQuery, tables, technology);
  const formattedGeneratedQuery = generatedQuery.data && utils.formatSqlQuery(generatedQuery.data, technology);
  const [editorQuery, setEditorQuery] = useStateDomain<string>(formattedGeneratedQuery, [formattedGeneratedQuery]);
  const [validatedQuery, setValidatedQuery] = useStateDomain<string>(undefined, [editorQuery]);
  const [explainedQuery, setExplainedQuery] = useStateDomain<string>(undefined, [editorQuery]);
  const [convertedQuery, setConvertedQuery] = useStateDomain<string>(undefined, [editorQuery]);
  const validationRequest = useQuery(api.validateQuery, technology, validatedQuery);
  const explanationRequest = useQuery(api.explainQuery, technology, explainedQuery);
  const convertionRequest = useQuery(api.convertQuery, technology, convertedQuery);
  const isEmptyQuery = !editorQuery || editorQuery === "";
  const convertionResult = convertionRequest.data;

  const setFormattedEditorQuery = (query: string) => setEditorQuery(utils.formatSqlQuery(query, technology));

  useEffect(() => {
    if (convertionResult) {
      setFormattedEditorQuery(convertionResult);
    }
  }, [convertionResult]);

  useEffect(() => {
    if (initialQuery) {
      setFormattedEditorQuery(initialQuery);
    }
  }, [initialQuery]);

  return (
    <Box style={{ height: '100%', display: hidden ? 'none' : 'block' }}>
      <Button disabled={!initialData.isSuccess} variant="contained" sx={{ height: 30, marginRight: 2 }} onClick={() => setUsedQuery(query)}>
        Generate query
      </Button>
      <SqlEditor query={editorQuery} queryLoading={generatedQuery.isLoading} setQuery={setEditorQuery} />
      <Box
        height={20}
        marginTop={1}
        marginBottom={-2}
        marginRight={0.5}
        display="flex"
        alignItems="center"
        justifyContent="end"
      >
        <ButtonGroup>
          <SqlTooltip isLoading={validationRequest.isLoading} disabled={isEmptyQuery} title='Validate' onClick={() => setValidatedQuery(editorQuery)} icon={<CheckCircleOutlineOutlinedIcon />} />
          <SqlTooltip isLoading={explanationRequest.isLoading} disabled={isEmptyQuery} title='Explain' onClick={() => setExplainedQuery(editorQuery)} icon={<WbIncandescentOutlinedIcon />} />
          <SqlTooltip isLoading={convertionRequest.isLoading} disabled={isEmptyQuery} title={`Convert to ${technology} format`} onClick={() => setConvertedQuery(editorQuery)} icon={<LoopOutlinedIcon />} />
        </ButtonGroup>
      </Box>
      <Box display="flex" flexDirection="column" marginBottom={1}>
        <Typography fontSize={15} fontWeight={550} marginTop={2}>
          Query suggestions:
        </Typography>
        <Box>
          {queryExamples.map(({ query }, i) =>
            <QuerySuggestion key={i} query={query} onClick={setFormattedEditorQuery} technology={technology} />)}
        </Box>
      </Box>
      <Box minHeight={140}>
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
      </Box>
      <ActionButtons disabled={isEmptyQuery} onConfirm={() => editorQuery && window.hostFunctions?.onOk(editorQuery)} />
    </Box>
  );
});
