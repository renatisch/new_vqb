import { Dispatch, SetStateAction, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Box from "@mui/material/Box";
import { sql } from "@codemirror/lang-sql";
import { StandardSQL } from "@codemirror/lang-sql";
import { format } from "sql-formatter";

import { component } from "../../framework";
import { LoaderOverlay } from "./LoadingOverlay";

interface SqlEditorProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  queryLoading: boolean;
  setQueryLoading: Dispatch<SetStateAction<boolean>>;
}

export const SqlEditor = component<SqlEditorProps>(({ query, setQuery, queryLoading }) => {
  const extensions = [sql({ dialect: StandardSQL, upperCaseKeywords: true })];

  const onChange = useCallback((val: any) => {
    // const formattedQuery = format(val, {
    //   language: "snowflake",
    //   keywordCase: "upper",
    // });
    setQuery(val);
  }, []);

  return (
    <Box padding={0}>
      {queryLoading ? <LoaderOverlay /> : <Box height={"30px"}></Box>}
      <CodeMirror
        value={query}
        height="300px"
        extensions={extensions}
        onChange={onChange}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          highlightActiveLineGutter: false,
          indentOnInput: false,
          syntaxHighlighting: true,
          autocompletion: true,
          searchKeymap: false,
        }}
      />
    </Box>
  );
});