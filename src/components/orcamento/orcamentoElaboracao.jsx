import React from "react";
import HeaderOrcamento from "./headerOrcamento";
import DadosGeraisOrcamento from "./dadosGeraisOrcamentos";

const OrcamentoElaboracao = props => {
  return (
    <React.Fragment>
      <HeaderOrcamento></HeaderOrcamento>
      <DadosGeraisOrcamento></DadosGeraisOrcamento>
    </React.Fragment>
  );
};

export default OrcamentoElaboracao;

//ver video sobre o context api para poder atualizar
//toda a informação nos vários componentes
