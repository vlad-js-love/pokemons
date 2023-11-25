import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./store/root";
import React from "react";
import { AppLoader } from "./components/AppLoader/AppLoader";

const store = setupStore();

const rootElement = document.getElementById("root");
const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(rootElement!).render(
  <React.Suspense fallback={<AppLoader />}>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Suspense>
);
