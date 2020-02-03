import React from "react";
import OrcamentoModal from "./orcamentoModal";

const MenuOrcamentos = props => {
  return (
    <div className="headerStyles">
      <div className="container">
        <div className="row justify-content-certer">
          <div className="headerIcon col-2 mt-3">
            <OrcamentoModal addNovoOrcamento={props.addNovoOrcamento} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOrcamentos;
