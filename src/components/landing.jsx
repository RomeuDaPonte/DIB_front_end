import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidbar from "./sidbar";
import accountService from "../services/account";
import NovoUser from "./account/novoUser";

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
        <Switch>
          <Route path="/novouser" component={NovoUser} />
        </Switch>
      </div>
    );
  }
}

export default Landing;
