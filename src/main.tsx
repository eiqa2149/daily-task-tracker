import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/ModalContext";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>
);
