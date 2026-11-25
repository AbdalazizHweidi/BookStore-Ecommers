import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/bootstrap.min.css"; // Hairnic's Bootstrap build
import "./styles/template.css"; // Hairnic's own styles (trimmed)
import "./styles/books.css"; // bookstore additions and palette changes

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
