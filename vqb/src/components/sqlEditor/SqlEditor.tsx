import {
  Box,
  Checkbox,
  Typography,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Chip,
  ButtonGroup,
  Alert,
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import SqlEditor from "./components/Editor";
import { format } from "sql-formatter";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import { useContext } from "react";

const queryExamples = [
  {
    query: "SELECT * FROM ACME_ORG.MARKETING.department_table;",
  },
  {
    query: 'SELECT * FROM "DATA"."Schema"."Upload" WHERE "data" > 0;',
  },
  {
    query:
      "SELECT * FROM alteryx.staff.product_department JOIN alteryx.staff.offices ON location = location WHERE alteryx.staff.product_department.location = 'Prague';",
  },
];

type ValidateApiResponse = {
  is_query_valid: string;
  valid_query: string;
};

type apiResponse = {
  data_source: string;
  is_query_correct: string;
  initial_query: string;
  validated_query: string;
  query_description: string;
};

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 20000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

type SqlEditorProps = {
  editorQuery: string;
  setEditorQuery: React.Dispatch<React.SetStateAction<string>>;
  queryLoading: boolean;
  setQueryLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SqlEditorView({
  editorQuery,
  setEditorQuery,
  queryLoading,
  setQueryLoading,
}: SqlEditorProps) {
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [loading, setLoading] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [validatedQuery, setValidatedQuery] = useState("");

  const smartOptions = [
    { option: "Validate", icon: <CheckCircleOutlineOutlinedIcon /> },
    { option: "Explain", icon: <WbIncandescentOutlinedIcon /> },
    { option: "Convert", icon: <LoopOutlinedIcon /> },
    { option: "Optimize", icon: <TuneOutlinedIcon /> },
  ];

  useEffect(() => {}, [validatedQuery]);

  const handlePass = () => {};

  const handleSuggestionSelect = (query: string) => {
    const formattedQuery = format(query, { language: "snowflake" });
    setEditorQuery(formattedQuery);
    setError(false);
  };

  const handleExplain = () => {};

  const handleValidate = () => {
    let payload = {
      technology: "Snowflake",
      query: editorQuery,
    };
    instance
      .post("/queries/validate", payload)
      .then((response) => {
        console.log(response.data);
        if (response.data.is_query_valid === "valid") {
          setError(false);
          setHelperText("");
        } else if (response.data.is_query_valid === "invalid") {
          setError(true);
          setHelperText(response.data.description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box padding={2} paddingLeft={0} display={"flex"} flexDirection={"column"}>
      <SqlEditor
        query={editorQuery}
        setQuery={setEditorQuery}
        queryLoading={queryLoading}
        setQueryLoading={setQueryLoading}
      />
      <Box
        height={20}
        marginTop={1}
        marginRight={0.5}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <ButtonGroup>
          {smartOptions.map((option, index) => {
            return (
              <Tooltip title={option.option} key={index}>
                <IconButton
                  sx={{ marginRight: 0 }}
                  onClick={() => {
                    option.option === "Validate"
                      ? handleValidate()
                      : option.option === "Explain"
                      ? handleExplain()
                      : handlePass();
                  }}
                >
                  {option.icon}
                </IconButton>
              </Tooltip>
            );
          })}
        </ButtonGroup>
      </Box>
      {!error && helperText.length < 1 ? (
        <Box height={112}>
          <Alert severity="success" sx={{ margin: 1, padding: 1 }}>
            <Typography marginLeft={1}>Valid query</Typography>
          </Alert>
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ margin: 1, padding: 1 }}>
          <Typography marginLeft={1}>Invalid query. {helperText}</Typography>
        </Alert>
      ) : (
        <></>
      )}
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
            <Stack spacing={1} direction={"row"}>
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
      <Box display={"flex"} flexDirection={"column"} marginTop={0.5}>
        <Typography fontSize={15} fontWeight={550} marginBottom={1}>
          Query suggestions:
        </Typography>
        {queryExamples.map((query, index) => {
          return (
            <Box margin={0.5} key={index}>
              <Stack spacing={1} direction={"row"}>
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
      <Box display={"flex"} alignItems={"center"} marginTop={2}>
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
}
