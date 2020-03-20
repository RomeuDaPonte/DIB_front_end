import { useState, useEffect } from "react";
import { getAllForOrcamento } from "../../../services/tarefa";

export default function useListaDeTarefas(orcamento) {
  const [tarefas, setTarefas] = useState({ tarefas: [] });

  useEffect(() => {
    (async function() {
      if (orcamento) {
        const { data: tarefas } = await getAllForOrcamento(orcamento._id);
        setTarefas(tarefas);
      }
    })();
  }, [orcamento]);

  return [tarefas, setTarefas];
}
