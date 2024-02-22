import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { QueryBuilderDialog } from "./components/smart/Dialog";

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <QueryBuilderDialog />
      </QueryClientProvider>
    </div>
  );
}
