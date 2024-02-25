import { FC, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { QueryBuilderDialog } from "./components/smart/QueryBuilderDialog";
import { getDbStructureMock } from "./types/designerApi";

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

export const App: FC = () => {
  useEffect(() => {
    if (!window.hostFunctions || !window.hostFunctions.getDBStructure) {
      window.hostFunctions = {
        getDBStructure: getDbStructureMock,
      }
  }}, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <QueryBuilderDialog />
      </QueryClientProvider>
    </div>
  );
}
