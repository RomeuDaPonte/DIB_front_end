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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default TabelaDePrecos;
