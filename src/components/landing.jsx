import React, { Component } from "react";
import Sidbar from "./sideBar/sidbar";
import accountService from "../services/account";

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
      <React.Fragment>
        <Sidbar user={this.state.user} />
      </React.Fragment>
    );
  }
}

export default Landing;
