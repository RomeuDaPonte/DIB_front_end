import React, { useState } from "react";
import HeaderOrcamento from "./headerOrcamento";
import DadosGeraisOrcamento from "./dadosGeraisOrcamentos";
import { OrcamentoContext } from "../../contexts/orcamentoContext";

const OrcamentoElaboracao = props => {
  const state = {
    mostraListaDeTarefas: true,
    orcamentoId: props.match.params.id
  };
  const [currentPageState, setPageState] = useState(state);

  return (
    <>
      <OrcamentoContext.Provider value={{ currentPageState, setPageState }}>
        <HeaderOrcamento></HeaderOrcamento>
        <DadosGeraisOrcamento></DadosGeraisOrcamento>
      </OrcamentoContext.Provider>
    </>
  );
};

export default OrcamentoElaboracao;
