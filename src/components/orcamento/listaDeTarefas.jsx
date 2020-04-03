import React from "react";
import SingleTarefa from "./singleTarefa.jsx";
import CabecalhoListaDeTarefas from "./cabecalhoListaDeTarefas";
import { usePrecosValue } from "../../contexts/precosContext";
import useListaDeTarefas from "../../customHooks/useListaDeTarefas";
import { useOrcamentoValue } from "../../contexts/orcamentoContext";

const emptyTarefa = {
  tarefaId: "",
  tipoDeTarefa: "",
  descricao: "",
  quantidade: "0",
  custoUnitario: "0",
  total: "0"
};

const ListaDeTarefas = () => {
  const { precos } = usePrecosValue();
  const { orcamento } = useOrcamentoValue();
  const [tarefas, setTarefas] = useListaDeTarefas(orcamento);

  function updateListaDeTarefas(tarefa, add = true) {
    const tarefasGuardadas = [...tarefas];

    if (add) addTarefa(tarefasGuardadas, tarefa);
    else removeTarefa(tarefasGuardadas, tarefa);
  }

  function addTarefa(listaDeTarefas, novaTarefa) {
    listaDeTarefas.push(novaTarefa);
    setTarefas(listaDeTarefas);
  }

  function removeTarefa(listaDeTarefas, tarefaARemover) {
    const index = listaDeTarefas.findIndex(t => t._id === tarefaARemover._id);
    listaDeTarefas.splice(index, 1);
    setTarefas(listaDeTarefas);
  }

  function canRenderTarefaRow() {
    return tarefas.length > 0 ? true : false;
  }

  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">Lista de tarefas</h4>
      <div className="card-body">
        <div className="row">
          <CabecalhoListaDeTarefas />
        </div>
        {canRenderTarefaRow() &&
          tarefas.map(t => (
            <SingleTarefa
              key={t._id}
              precos={precos}
              tarefa={t}
              updateListaDeTarefas={updateListaDeTarefas}
            />
          ))}
        <SingleTarefa
          updateListaDeTarefas={updateListaDeTarefas}
          precos={precos}
          tarefa={{ ...emptyTarefa }}
        />
      </div>
    </div>
  );
};

export default ListaDeTarefas;
