import React from "react";
import NovoOrcamentoModal from "./novoOrcamentoModal";

const Orcamento = () => {
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
    </React.Fragment>
  );
};

export default Orcamento;
