import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import AdminLayout from "./layouts/Admin.js";
import "./assets/css/apod.css"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login/" render={() => <Login />} />
      <Route path="/admin/" render={() => <AdminLayout />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
