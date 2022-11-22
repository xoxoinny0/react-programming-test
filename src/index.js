import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Meta from "./Meta";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Meta />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
