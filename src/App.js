import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/account/login";
import Landing from "./components/landing";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
