import React, { Component } from "react";
import { toast } from "react-toastify";
import EntidadeModal from "./entidadeModal";
import * as entidade from "../../services/entidadeService";
import TabelaDeEntidades from "./tabelaDeEntidades";
import PesquisaEntidadeModal from "./pesquisaEntidadeModal";

class Entidade extends Component {
  state = {
    entidades: []
  };

  async componentDidMount() {
    const { data: entidades } = await entidade.getAllEntidades();

    this.setState({ entidades });
  }

  updateListaDeEntidades = novaEntidade => {
    const listaDeEntidades = this.state.entidades;
    let entidadeAEditar = listaDeEntidades.find(entida => {
      return entida._id === novaEntidade._id;
    });

    if (entidadeAEditar)
      this.updateSingleEntidade(entidadeAEditar, novaEntidade);
    else this.addNovaEntidade(novaEntidade);

    toast.success("Alterações efectuadas com sucesso!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  mostraResultadosDaPesquisa = resultadosDaPesquisa => {
    this.setState({ entidades: resultadosDaPesquisa });
  };

  updateSingleEntidade(entidadeAEditar, novaEntidade) {
    const listaDeEntidades = this.state.entidades;
    listaDeEntidades[listaDeEntidades.indexOf(entidadeAEditar)] = novaEntidade;

    this.setState({ entidade: listaDeEntidades });
  }

  addNovaEntidade(novaEntidade) {
    const listaDeEntidades = this.state.entidades;
    listaDeEntidades.push(novaEntidade);
    this.setState({ entidades: listaDeEntidades });
  }

  render() {
    return (
      <React.Fragment>
        <div className="headerStyles">
          <div className="container">
            <div className="row justify-content-center">
              <div className="headerIcon col-2 mt-3">
                <EntidadeModal
                  updateListaDeEntidades={this.updateListaDeEntidades}
                />
              </div>
              <div className="headerIcon col-2 mt-3">
                <PesquisaEntidadeModal
                  pesquisar={this.mostraResultadosDaPesquisa}
                />
              </div>
            </div>
          </div>
        </div>
        <TabelaDeEntidades
          listaDeEntidades={this.state.entidades}
          updateListaDeEntidades={this.updateListaDeEntidades}
        />
      </React.Fragment>
    );
  }
}

export default Entidade;
