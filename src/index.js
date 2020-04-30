import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
const serviceWorker = require ("./serviceWorker.js")


render(
  <Router basename={"/gwas"}>
    <App />
  </Router>,
  document.getElementById("root")
);


serviceWorker.register();
