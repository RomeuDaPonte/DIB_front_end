import React, { useState, useEffect } from "react";
import HeaderOrcamento from "./headerOrcamento";
import DadosGeraisOrcamento from "./dadosGeraisOrcamentos";
import ListaDeTarefas from "./listaDeTarefas";
import { OrcamentoContext } from "../../contexts/orcamentoContext";
import * as orcamentoService from "../../services/orcamentoDadosGeraisService";

const OrcamentoElaboracao = props => {
  const state = {
    mostraListaDeTarefas: true,
    orcamento: {}
  };

  const [orcamentoState, setOrcamento] = useState(state);

  useEffect(() => {
    (async function() {
      const { data: orcamento } = await orcamentoService.get(
        props.match.params.id
      );
      setOrcamento({
        ...orcamentoState,
        orcamento
      });
    })();
  }, [props]);

  return (
    <>
      <OrcamentoContext.Provider value={{ orcamentoState, setOrcamento }}>
        <HeaderOrcamento></HeaderOrcamento>
        <DadosGeraisOrcamento></DadosGeraisOrcamento>
        <ListaDeTarefas></ListaDeTarefas>
      </OrcamentoContext.Provider>
    </>
  );
};

export default OrcamentoElaboracao;
