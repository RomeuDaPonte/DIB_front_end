import React, { createContext, useContext } from "react";
import { useOrcamento } from "../customHooks/useOrcamento";

export const OrcamentoContext = createContext(null);

export const OrcamentoProvider = props => {
  const { orcamento, setOrcamento } = useOrcamento(props.orcamentoId);

  return (
    <OrcamentoContext.Provider value={{ orcamento, setOrcamento }}>
      {props.children}
    </OrcamentoContext.Provider>
  );
};

export const useOrcamentoValue = () => useContext(OrcamentoContext);
