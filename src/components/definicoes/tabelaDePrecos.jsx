import React from "react";

const TabelaDePrecos = ({
  automacao,
  consultoria,
  desenvolvimento,
  maquinacao,
  margem,
  montagem
}) => {
  return (
    <div className="card m-2">
      <h4 className="card-header bg-info text-white bg-dark">
        Preços em vigor
      </h4>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Automação</th>
              <th>Consultoria</th>
              <th>Desenvolvimento</th>
              <th>Maquinação</th>
              <th>Margem</th>
              <th>Montagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{automacao}</td>
              <td>{consultoria}</td>
              <td>{desenvolvimento}</td>
              <td>{maquinacao}</td>
              <td>{margem} %</td>
              <td>{montagem}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaDePrecos;
