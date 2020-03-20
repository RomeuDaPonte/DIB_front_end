import React, { useContext } from "react";
import SingleTarefa from "./singleTarefa";
import CabecalhoListaDeTarefas from "./cabecalhoListaDeTarefas";
import { OrcamentoContext } from "../../contexts/orcamentoContext";
import useListaDeTarefas from "./custmoStates/useListaDeTarefas";

const ListaDeTarefas = () => {
  const { orcamentoState, precos } = useContext(OrcamentoContext);
  delete precos.margem;
  const { orcamento } = orcamentoState;

  const [tarefas, setTarefas] = useListaDeTarefas(orcamento);

  function canRenderTarefaRow() {
    if (orcamentoState.orcamento) return true;

    return false;
  }

  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">Lista de tarefas</h4>
      <div className="card-body">
        <div className="row">
          <CabecalhoListaDeTarefas />
        </div>
        {!canRenderTarefaRow() && <h3>Loding...</h3>}
        {canRenderTarefaRow() && (
          <SingleTarefa orcamento={orcamentoState.orcamento} precos={precos} />
        )}
      </div>
    </div>
  );
};

export default ListaDeTarefas;
