import AppRouter from "@/router/routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/@utils/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
