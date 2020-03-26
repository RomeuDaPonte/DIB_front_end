import React from "react";
import SingleTarefa from "./singleTarefa";
import CabecalhoListaDeTarefas from "./cabecalhoListaDeTarefas";
import { useOrcamentoValue } from "../../contexts/orcamentoContext";
import { usePrecosValue } from "../../contexts/precosContext";
import useListaDeTarefas from "../../customHooks/useListaDeTarefas";

const ListaDeTarefas = () => {
  const { orcamento } = useOrcamentoValue();
  const { precos } = usePrecosValue();
  const [tarefas, setTarefas] = useListaDeTarefas(orcamento);

  function canRenderTarefaRow() {
    return orcamento && tarefas.length > 0 ? true : false;
  }

  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">Lista de tarefas</h4>
      <div className="card-body">
        <div className="row">
          <CabecalhoListaDeTarefas />
        </div>
        {!canRenderTarefaRow() && <h3>Loding...</h3>}
        {canRenderTarefaRow() &&
          tarefas.map(t => (
            <SingleTarefa
              key={t._id}
              orcamento={orcamento}
              precos={precos}
              tarefa={t}
            />
          ))}
        {canRenderTarefaRow() && (
          <SingleTarefa orcamento={orcamento} precos={precos} />
        )}
      </div>
    </div>
  );
};

export default ListaDeTarefas;
