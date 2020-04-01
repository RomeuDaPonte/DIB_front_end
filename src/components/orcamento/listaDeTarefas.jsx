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

  function addTarefa(novaTarefa) {
    const tarefasGuardadas = [...tarefas];
    tarefasGuardadas.push(novaTarefa);
    setTarefas(tarefasGuardadas);
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
            <SingleTarefa key={t._id} precos={precos} tarefa={t} />
          ))}
        <SingleTarefa
          addTarefa={addTarefa}
          precos={precos}
          tarefa={{ ...emptyTarefa }}
        />
      </div>
    </div>
  );
};

export default ListaDeTarefas;
