import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TabelaDeOrcamentos from "./tabelaDeOrcamentos";
import * as orcamento from "../../services/orcamento";
import MenuOrcamentos from "./menuOrcamentos";
import OrcamentoElaboracao from "./orcamentoElaboracao";

const ListaDeOrcamentos = () => {
  const state = {
    orcamentos: [],
    orcamentoAElaborar: {}
  };

  const [currentState, setOrcamentos] = useState(state);

  useEffect(() => {
    (async function() {
      const { data: orcamentos } = await orcamento.getAll();
      setOrcamentos({ ...currentState, orcamentos });
    })();
  }, []);

  function addNovoOrcamento(novoOrcamento) {
    setOrcamentos({ orcamentoAElaborar: novoOrcamento });

    toast.success("Orçamento criado com sucesso!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  function renderElaborarOrcamento() {
    const { orcamentoAElaborar } = currentState;
    if (Object.entries(orcamentoAElaborar).length === 0)
      return <TabelaDeOrcamentos orcamentos={currentState.orcamentos} />;

    return <OrcamentoElaboracao orcamento={currentState.orcamentoAElaborar} />;
  }

  return (
    <React.Fragment>
      <MenuOrcamentos addNovoOrcamento={addNovoOrcamento} />
      {renderElaborarOrcamento()}
    </React.Fragment>
  );
};

export default ListaDeOrcamentos;
