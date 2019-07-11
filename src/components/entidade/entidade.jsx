import React, { Component } from "react";
import EntidadeModal from "./entidadeModal";

class Entidade extends Component {
  state = {
    entidades: []
  };

  render() {
    return (
      <div className="headerStyles">
        <div className="container">
          <div className="row justify-content-center">
            <div className="headerIcon col-2 mt-3">
              <EntidadeModal />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Entidade;
