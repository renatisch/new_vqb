import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { format } from "sql-formatter";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from "@mui/material/Alert";

import { queryExamples } from "../constants/querySamples";
import { SqlEditor } from "./atomic/SqlEditor";
import { instance } from "../logic";

type SqlEditorProps = {
  editorQuery: string;
  setEditorQuery: Dispatch<SetStateAction<string>>;
  queryLoading: boolean;
  setQueryLoading: Dispatch<SetStateAction<boolean>>;
};

export const SqlEditorView: FC<SqlEditorProps> = ({
  editorQuery,
  setEditorQuery,
  queryLoading,
  setQueryLoading,
}) => {
  const [error, setError] = useState(false);
  const [smartAction, setSmartAction] = useState("");
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

  const handleExplain = () => {
    let payload = {
      technology: "Snowflake",
      query: editorQuery,
    };
    instance
      .post("/queries/explain", payload)
      .then((response) => {
        setSmartAction("explain");
        setHelperText(response.data.query_description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleValidate = () => {
    let payload = {
      technology: "Snowflake",
      query: editorQuery,
    };
    instance
      .post("/queries/validate", payload)
      .then((response) => {
        setSmartAction("validate");
        console.log(response.data);
        if (response.data.is_query_valid === "valid") {
          setError(false);
          setHelperText("Query is valid.");
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
      {!error && smartAction === "explain" ? (
        <Box height={112}>
          <Alert severity="info" sx={{ margin: 1, padding: 1 }}>
            <Typography marginLeft={1}>{helperText}</Typography>
          </Alert>
        </Box>
      ) : !error && helperText.length < 1 ? (
        <Box height={112} />
      ) : !error && helperText.length > 1 ? (
        <Box height={112}>
          <Alert severity="success" sx={{ margin: 1, padding: 1 }}>
            <Typography marginLeft={1}>{helperText}</Typography>
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
};
