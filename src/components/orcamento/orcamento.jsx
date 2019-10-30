import React, { useState, useEffect } from "react";
import NovoOrcamentoModal from "./novoOrcamentoModal";
import TabelaDeOrcamentos from "./tabelaDeOrcamentos";
import * as orcamento from "../../services/orcamento";

const Orcamento = () => {
  const state = {
    orcamentos: []
  };

  const [currentState, setOrcamentos] = useState(state);

  useEffect(() => {
    (async function() {
      const { data: orcamentos } = await orcamento.getAll();
      setOrcamentos({ orcamentos });
    })();
  }, []);

  return (
    <React.Fragment>
      <div className="headerStyles">
        <div className="container">
          <div className="row justify-content-certer">
            <div className="headerIcon col-2 mt-3">
              <NovoOrcamentoModal />
            </div>
          </div>
        </div>
      </div>
      <TabelaDeOrcamentos orcamentos={currentState.orcamentos} />
    </React.Fragment>
  );
};

export default Orcamento;
