import { useEffect, useState } from "react";

export default function useListaDeTarefasState(precos) {
  const [tarefas, setNomesDasTarefas] = useState({
    nomes: []
  });
  useEffect(() => {
    (async function() {
      const nomesDasTarefas = [...Object.keys(precos)];
      setNomesDasTarefas({ nomes: nomesDasTarefas });
    })();
  }, [precos]);

  return tarefas;
}
