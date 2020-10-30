import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import Header from "./common/Header";
import HomePage from "./HomePage";
import VariantsPage from "./VariantsPage";
import UploadPage from "./UploadPage";



function App() {
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/variants/:slug" component={VariantsPage} />
        <Route path = "/upload" component = {UploadPage}/>
        {/*    <Redirect from="/about-page" to="/about" /> 
      <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
