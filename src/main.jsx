import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Reducer from "./utils/TimeContext.jsx";
import { router } from "./App.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Reducer>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Reducer>
  </React.StrictMode>
);
