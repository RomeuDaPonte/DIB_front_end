import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidbar from "./sidbar";
import accountService from "../services/accountService";
import Definicoes from "./definicoes/definicoes";
import Entidade from "./entidade/entidade";

class Landing extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = accountService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <Sidbar user={this.state.user} />
        <div className="contentorPrincipal">
          <Switch>
            <Route path="/definicoes" component={Definicoes} />
            <Route path="/entidade" component={Entidade} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Landing;
