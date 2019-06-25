import React, { Component } from "react";
import RegisterModal from "./registerModal";

class UsersList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="headerStyles">
          <div className="container">
            <div className="row justify-content-center">
              <div className="headerIcon col-1 mt-3">
                <RegisterModal />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UsersList;
