import React, { useContext, createContext } from "react";
import { usePrecos } from "../customHooks/usePrecos";

export const PrecosContext = createContext();

export const PrecosProvider = ({ children }) => {
  const { precos, setPrecos } = usePrecos();

  return (
    <PrecosContext.Provider value={{ precos, setPrecos }}>
      {children}
    </PrecosContext.Provider>
  );
};

export const usePrecosValue = () => useContext(PrecosContext);
