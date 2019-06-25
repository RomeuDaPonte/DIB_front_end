import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidbar from "./sidbar";
import accountService from "../services/account";
import UsersList from "./account/usersList";

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
            <Route path="/users" component={UsersList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Landing;
