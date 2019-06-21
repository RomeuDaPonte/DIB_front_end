import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/account/login";
import Landing from "./components/landing";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
