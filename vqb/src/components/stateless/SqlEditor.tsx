import CodeMirror from "@uiw/react-codemirror";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { sql } from "@codemirror/lang-sql";
import { StandardSQL } from "@codemirror/lang-sql";

import { component } from "../../framework";

interface SqlEditorProps {
  queryLoading: boolean;
  query?: string;
  setQuery: (value: string) => void;
}

export const SqlEditor = component<SqlEditorProps>(({ queryLoading, query, setQuery }) => {
  const extensions = [sql({ dialect: StandardSQL, upperCaseKeywords: true })];

  return (
    <Box padding={0}>
      <Box sx={{ width: "100%", height: 4, marginTop: 2 }}>
        {queryLoading && <LinearProgress />}
      </Box>
      <Box boxShadow='0px 1px 2px 1px #0002'>
        <CodeMirror
          value={query}
          height="200px"
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
    </Box>
  );
});
