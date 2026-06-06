import AppRouter from "@/router/routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/auth/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
