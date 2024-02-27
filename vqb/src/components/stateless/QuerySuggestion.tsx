import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { component, useQuery } from "../../framework";
import { api } from '../../utils/api';

type QuerySuggestionProps = {
  technology?: string;
  query: string;
  onClick: (query: string) => void;
}

export const QuerySuggestion = component<QuerySuggestionProps>(({ query, technology, onClick }) => {
  const convertedQuery = useQuery(api.convertQuery, technology, query);

  return (
    <div>
      {convertedQuery.isLoading ? <CircularProgress size={16} style={{ margin: 14 }} /> :
        convertedQuery.data &&
        <Button style={{ maxWidth: '100%', padding: 0 }} onClick={() => onClick(convertedQuery.data)}>
          <SyntaxHighlighter
            language="sql"
            style={oneLight}
            customStyle={{ display: 'inline-block', boxShadow: '0px 2px 2px 0px #0002', background: '#e9effa', fontSize: 13, margin: 4, padding: 4, cursor: 'pointer' }}
            codeTagProps={{ style: { background: '#e3eaf3', color: "black" } }}
          >
            {convertedQuery.data}
          </SyntaxHighlighter>
        </Button>
      }
    </div>
  );
});
