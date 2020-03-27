import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "../../customHooks/userForm";
import { renderInput } from "../common/formInputs";
import { useOrcamentoValue } from "../../contexts/orcamentoContext";
import tarefaSchema from "../../schemas/orcamento/tarefaSchema";
import useSingleTarefa from "../../customHooks/useSingleTarefa";
import * as tarefaService from "../../services/tarefa";

const SingleTarefa = ({ addTarefa, precos, tarefa }) => {
  delete precos.margem;
  const tiposDeTarefa = useSingleTarefa(precos);
  const { orcamento } = useOrcamentoValue();

  const formState = {};
  const { schema } = tarefaSchema;
  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    formState,
    schema
  });

  useEffect(() => {
    console.log(tarefa);
    setFormValues({
      data: tarefa,
      errors: [],
      saved: tarefa.total !== "0" ? true : false
    });
  }, [setFormValues, tarefa]);

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

  async function submit(e) {
    const tarefa = currentFormState.data;
    if (canSubmit(e)) {
      try {
        const { data: novaTarefa } = await tarefaService.nova(
          orcamento._id,
          tarefa
        );
        addTarefa(novaTarefa);
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
                onClick={submit}
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
