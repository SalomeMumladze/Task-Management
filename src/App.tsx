import AppRouter from "@/router/routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";
import { AuthProvider } from "@/providers/AuthProvider";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
