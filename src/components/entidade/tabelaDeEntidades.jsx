import React, { Component } from "react";
import EntidadeModal from "./entidadeModal";

class TabelaDeEntidades extends Component {
  render() {
    const { listaDeEntidades } = this.props;

    return (
      <div className="card m-2">
        <h4 className="card-header text-white bg-dark">Lista de entidades</h4>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nif</th>
                <th>Localidade</th>
                <th>Condições de pagamento</th>
                <th>Tipo</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {listaDeEntidades &&
                listaDeEntidades.map(entidade => (
                  <tr key={entidade._id}>
                    <td>{entidade.name}</td>
                    <td>{entidade.nif}</td>
                    <td>{entidade.localidade}</td>
                    <td>{entidade.condicoesDePagamento}</td>
                    <td>{entidade.tipo}</td>
                    <td>
                      <EntidadeModal entidadeId={entidade._id} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TabelaDeEntidades;
