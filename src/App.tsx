import AppRouter from "@/router/routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/auth/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WorkspaceProvider } from "./workpsace/WorkspaceProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </Provider>
        </QueryClientProvider>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
