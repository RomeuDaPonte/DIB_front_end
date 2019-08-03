import React, { Component } from "react";
import EntidadeModal from "./entidadeModal";
import * as entidade from "../../services/entidadeService";
import TabelaDeEntidades from "./tabelaDeEntidades";

class Entidade extends Component {
  state = {
    entidades: []
  };

  async componentDidMount() {
    const { data: entidades } = await entidade.getAllEntidades();

    this.setState({ entidades });
  }

  render() {
    return (
      <React.Fragment>
        <div className="headerStyles">
          <div className="container">
            <div className="row justify-content-center">
              <div className="headerIcon col-2 mt-3">
                <EntidadeModal />
              </div>
            </div>
          </div>
        </div>
        <TabelaDeEntidades listaDeEntidades={this.state.entidades} />
      </React.Fragment>
    );
  }
}

export default Entidade;
