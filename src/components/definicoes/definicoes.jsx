import React, { Component } from "react";
import RegisterModal from "../account/registerModal";
import PrecosFormModal from "./precosFormModal";
import TabelaDePrecos from "./tabelaDePrecos";

class Definicoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        automacao: "",
        consultoria: "",
        desenvolvimento: "",
        maquinacao: "",
        margem: "",
        montagem: ""
      }
    };
    this.renderPrecos = this.renderPrecos.bind(this);
  }

  renderPrecos(precos) {
    this.setState({ data: precos });
  }

  render() {
    const { data: precos } = this.state;

    return (
      <React.Fragment>
        <div className="headerStyles">
          <div className="container">
            <div className="row justify-content-center">
              <div className="headerIcon col-2 mt-3">
                <RegisterModal />
              </div>
              <div className="headerIcon col-2 mt-3">
                <PrecosFormModal showPrecos={this.renderPrecos} />
              </div>
            </div>
          </div>
        </div>
        <div className="card m-2">
          <h4 className="card-header bg-info text-white bg-dark">
            Preços em vigor
          </h4>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h1>Automação</h1>
              </div>
              <div className="col">
                <h1>Consultoria</h1>
              </div>
              <div className="col">
                <h1>Desenvolvimento</h1>
              </div>
              <div className="col">
                <h1>Maquinação</h1>
              </div>
              <div className="col">
                <h1>Margem</h1>
              </div>
              <div className="col">
                <h1>Montagem</h1>
              </div>
            </div>
            <div className="row">
              {this.state.data && (
                <TabelaDePrecos
                  automacao={precos.automacao}
                  consultoria={precos.consultoria}
                  desenvolvimento={precos.desenvolvimento}
                  maquinacao={precos.maquinacao}
                  margem={precos.margem}
                  montagem={precos.montagem}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Definicoes;
