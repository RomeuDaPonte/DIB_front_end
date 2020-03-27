import { useEffect, useState } from "react";

export default function useNomesDeTarefas(precos) {
  const [tarefas, setNomesDasTarefas] = useState({
    nomes: []
  });
  useEffect(() => {
    (function() {
      const nomesDasTarefas = [...Object.keys(precos)];
      nomesDasTarefas.unshift("");
      setNomesDasTarefas({ nomes: nomesDasTarefas });
    })();
  }, [precos]);

  return tarefas;
}
