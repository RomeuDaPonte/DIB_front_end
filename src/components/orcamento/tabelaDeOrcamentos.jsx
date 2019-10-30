import React, { Component } from "react";

const TabelaDeOrcamentos = props => {
  const { orcamentos } = props;
  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">Lista de orçamentos</h4>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Número</th>
              <th>Cliente</th>
              <th>Técnico responsavel</th>
              <th>Descritivo</th>
              <th>Data</th>
              <th>Elaborado por</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos &&
              orcamentos.map(orc => (
                <tr key={orc._id}>
                  <td>{orc.numero}</td>
                  <td></td>
                  <td>{orc.tecnicoResponsavel}</td>
                  <td>{orc.descritivo}</td>
                  <td>{orc.data.toString().slice(0, 10)}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaDeOrcamentos;
