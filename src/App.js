import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login/login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Login} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
