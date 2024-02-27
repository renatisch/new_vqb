import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from '@mui/material/Button';

import { component } from "../../framework";

type QuerySuggestionProps = {
  query: string;
  onClick: () => void;
}

export const QuerySuggestion = component<QuerySuggestionProps>(({ query, onClick }) =>
  <div>
    <Button style={{ padding: 0, marginLeft: -9 }} onClick={onClick}>
      <SyntaxHighlighter
        language="sql"
        style={oneLight}
        customStyle={{ display: 'inline-block', boxShadow: '0px 2px 2px 0px #0002', background: '#e3eaf3', fontSize: 13, margin: 10, padding: 4, cursor: 'pointer' }}
        codeTagProps={{ style: { background: '#e3eaf3', color: "black" } }}
      >
        {query}
      </SyntaxHighlighter>
    </Button>
  </div>
);
