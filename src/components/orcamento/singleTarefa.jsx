import React, { useRef } from "react";
import { toast } from "react-toastify";
import { renderInput } from "../common/formInputs";
import { useOrcamentoValue } from "../../contexts/orcamentoContext";
import { useSingleTarefa } from "../../customHooks/useSingleTarefa";
import useNomesDeTarefas from "../../customHooks/useNomesDeTarefas";
import * as tarefaService from "../../services/tarefa";

const SingleTarefa = ({ updateListaDeTarefas, precos, tarefa }) => {
  delete precos.margem;
  const tiposDeTarefa = useNomesDeTarefas(precos);
  const { orcamento } = useOrcamentoValue();
  const select = useRef();

  const selectDefault = () => (select.current.options.selectedIndex = 0);
  const setFocusOnSelect = () => select.current.focus();

  const {
    currentFormState,
    handleChange,
    canSubmit,
    setFormValues
  } = useSingleTarefa(tarefa);

  function onTipoDeTarefaChange(e) {
    const { data: tarefa } = currentFormState;
    tarefa.tipoDeTarefa = e.target.value;
    if (e.target.value) tarefa.custoUnitario = precos[e.target.value];
    if (tarefa.quantidade !== 0)
      tarefa.total = precos[e.target.value] * tarefa.quantidade;
    else tarefa.custoUnitario = "0";

    setFormValues({
      ...currentFormState,
      data: tarefa
    });
  }

  function handleQuantidadeChange(e) {
    const { data: tarefa } = currentFormState;
    tarefa.quantidade = e.target.value;
    tarefa.total = e.target.value * tarefa.custoUnitario;

    setFormValues({
      data: tarefa,
      ...currentFormState
    });
  }

  async function removeTarefa() {
    try {
      const { data: tarefaEliminada } = await tarefaService.deleteTarefa(
        currentFormState.data
      );

      updateListaDeTarefas(tarefaEliminada, false);
    } catch (ex) {
      toast.error(ex.response.data, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  async function addTarefa(e) {
    const tarefa = currentFormState.data;
    if (canSubmit(e)) {
      try {
        const { data: novaTarefa } = await tarefaService.nova(
          orcamento._id,
          tarefa
        );
        updateListaDeTarefas(novaTarefa);
        selectDefault();
        setFocusOnSelect();
      } catch (ex) {
        toast.error(ex.response.data, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }

  return (
    <>
      {currentFormState && tiposDeTarefa && (
        <div className="row">
          <div className="col">
            <select
              ref={select}
              name="tipoDeTarefa"
              id="tipoDeTarefa"
              className="form-control form-control-lg"
              onChange={onTipoDeTarefaChange}
              defaultValue={currentFormState.data.tipoDeTarefa}
            >
              {tiposDeTarefa.nomes.map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            {renderInput(
              currentFormState,
              "descricao",
              handleChange,
              "",
              "",
              "form-control-lg"
            )}
          </div>

          <div className="col-md-1">
            <div className="form-group">
              <input
                value={currentFormState.data.quantidade}
                onChange={handleQuantidadeChange}
                type="number"
                name="quantidade"
                className="form-control form-control-lg"
              />
              {Object.keys(currentFormState.errors).length > 0 && (
                <div className="alert alert-danger">
                  {currentFormState.errors["quantidade"]}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-group">
              <label style={{ fontSize: 30 }}>
                {currentFormState.data.custoUnitario} €
              </label>
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-group">
              <label style={{ fontSize: 30 }}>
                {currentFormState.data.total} €
              </label>
            </div>
          </div>
          <div className="col-md-1">
            {!currentFormState.saved && (
              <button
                type="button"
                onClick={addTarefa}
                className="fa fa-arrow-circle-down fa-3x"
                style={{
                  backgroundColor: "white",
                  border: "none",
                  color: "green"
                }}
              ></button>
            )}
            {currentFormState.saved && (
              <button
                type="button"
                className="fa fa-trash fa-3x"
                onClick={removeTarefa}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  color: "red"
                }}
              ></button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTarefa;
