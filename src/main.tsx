import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./store/root";
import App from "./App";

const store = setupStore();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
