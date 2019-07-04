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
          <div className="col">
            <h1>{automacao}</h1>
          </div>
          <div className="col">
            <h1>{consultoria}</h1>
          </div>
          <div className="col">
            <h1>{desenvolvimento}</h1>
          </div>
          <div className="col">
            <h1>{maquinacao}</h1>
          </div>
          <div className="col">
            <h1>{margem} %</h1>
          </div>
          <div className="col">
            <h1>{montagem}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelaDePrecos;
