import { useState, useEffect } from "react";
import * as orcamentoService from "../services/orcamentoDadosGeraisService";

export const useOrcamento = orcamentoId => {
  const [orcamento, setOrcamento] = useState(null);

  useEffect(() => {
    (async function() {
      const { data: orcamento } = await orcamentoService.get(orcamentoId);
      setOrcamento(orcamento);
    })();
  }, [orcamentoId]);

  return { orcamento, setOrcamento };
};
