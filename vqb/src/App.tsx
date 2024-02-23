import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { QueryBuilderDialog } from "./components/smart/QueryBuilderDialog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      retry: 0,
    },
  },
});

export const App: FC = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <QueryBuilderDialog />
      </QueryClientProvider>
    </div>
  );
}
