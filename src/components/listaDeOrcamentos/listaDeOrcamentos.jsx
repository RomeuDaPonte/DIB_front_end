import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TabelaDeOrcamentos from "./tabelaDeOrcamentos";
import * as orcamento from "../../services/orcamentoDadosGeraisService";
import HeaderListaDeOrcamentos from "./headerListaDeOrcamentos";

const ListaDeOrcamentos = props => {
  const state = {
    orcamentos: []
  };

  const [currentState, setOrcamentos] = useState(state);

  useEffect(() => {
    (async function() {
      const { data: orcamentos } = await orcamento.getAll();
      setOrcamentos({ ...currentState, orcamentos });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addNovoOrcamento(novoOrcamento) {
    props.history.push("/orcamento/" + novoOrcamento._id);

    toast.success("Orçamento criado com sucesso!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  return (
    <React.Fragment>
      <HeaderListaDeOrcamentos addNovoOrcamento={addNovoOrcamento} />
      <TabelaDeOrcamentos orcamentos={currentState.orcamentos} />
    </React.Fragment>
  );
};

export default ListaDeOrcamentos;
