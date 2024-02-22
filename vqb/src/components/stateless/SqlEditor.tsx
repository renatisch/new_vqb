import { Dispatch, SetStateAction, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Box from "@mui/material/Box";
import { sql } from "@codemirror/lang-sql";
import { StandardSQL } from "@codemirror/lang-sql";

import { component } from "../../framework";
import { LoaderOverlay } from "./LoadingOverlay";

interface SqlEditorProps {
  queryLoading: boolean;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const SqlEditor = component<SqlEditorProps>(({ queryLoading, query, setQuery }) => {
  const extensions = [sql({ dialect: StandardSQL, upperCaseKeywords: true })];

  return (
    <Box padding={0}>
      {queryLoading ? <LoaderOverlay /> : <Box height={"30px"}></Box>}
      <CodeMirror
        value={query}
        height="300px"
        extensions={extensions}
        onChange={setQuery}
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
