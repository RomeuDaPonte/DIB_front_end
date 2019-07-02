import React, { Component } from "react";
import RegisterModal from "../account/registerModal";
import PrecosFormModal from "./precosFormModal";

class Definicoes extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="headerStyles">
          <div className="container">
            <div className="row justify-content-center">
              <div className="headerIcon col-2 mt-3">
                <RegisterModal />
              </div>
              <div className="headerIcon col-2 mt-3">
                <PrecosFormModal />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Definicoes;
