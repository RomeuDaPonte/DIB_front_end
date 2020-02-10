import React, { useEffect, useState } from "react";
import HeaderOrcamento from "./headerOrcamento";
import DadosGeraisOrcamento from "./dadosGeraisOrcamentos";
import * as orcamentoService from "../../services/orcamentoDadosGeraisService";
import { OrcamentoContext } from "../../contexts/orcamentoContext";

const OrcamentoElaboracao = props => {
  const state = {
    orcamento: null
  };

  const [currentState, setOrcamento] = useState(state);

  useEffect(() => {
    (async function() {
      const { data: orcamento } = await orcamentoService.get(
        props.match.params.id
      );
      setOrcamento({
        ...currentState,
        orcamento
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {currentState.orcamento && (
        <OrcamentoContext.Provider value={currentState.orcamento}>
          <HeaderOrcamento></HeaderOrcamento>
          <DadosGeraisOrcamento></DadosGeraisOrcamento>
        </OrcamentoContext.Provider>
      )}
    </>
  );
};

export default OrcamentoElaboracao;

//ver video sobre o context api para poder atualizar
//toda a informação nos vários componentes
