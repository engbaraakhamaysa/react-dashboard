import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./all.min.css";

import UserProvider from "./Pages/Website/Context/UserContext";

import App from "./App";
import { BrowserRouter } from "react-router-dom"; // this to one page router

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
