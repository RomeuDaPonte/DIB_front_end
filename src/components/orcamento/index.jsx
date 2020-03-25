import React from "react";
import HeaderOrcamento from "./headerOrcamento";
import DadosGeraisOrcamento from "./dadosGeraisOrcamentos";
import ListaDeTarefas from "./listaDeTarefas";
import { OrcamentoProvider } from "../../contexts/orcamentoContext";
import { PrecosProvider } from "../../contexts/precosContext";

const IndexOrcamento = props => {
  return (
    <PrecosProvider>
      <OrcamentoProvider orcamentoId={props.match.params.id}>
        <HeaderOrcamento></HeaderOrcamento>
        <DadosGeraisOrcamento></DadosGeraisOrcamento>
        <ListaDeTarefas></ListaDeTarefas>
      </OrcamentoProvider>
    </PrecosProvider>
  );
};

export default IndexOrcamento;
