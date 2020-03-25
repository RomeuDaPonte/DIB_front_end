import { useEffect, useState } from "react";

export default function useSingleTarefa(precos) {
  const [tarefas, setNomesDasTarefas] = useState({
    nomes: []
  });
  useEffect(() => {
    (function() {
      const nomesDasTarefas = [...Object.keys(precos)];
      setNomesDasTarefas({ nomes: nomesDasTarefas });
    })();
  }, [precos]);

  return tarefas;
}
