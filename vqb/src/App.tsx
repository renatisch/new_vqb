import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { QueryBuilderDialog } from "./components/smart/QueryBuilderDialog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchInterval: Infinity,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <QueryBuilderDialog />
  </QueryClientProvider>
);
