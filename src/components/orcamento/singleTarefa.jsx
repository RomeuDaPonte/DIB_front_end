import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "../../customHooks/userForm";
import { renderInput } from "../common/formInputs";
import tarefaSchema from "../../schemas/orcamento/tarefaSchema";
import useSingleTarefa from "../../customHooks/useSingleTarefa";
import * as tarefaService from "../../services/tarefa";

const SingleTarefa = ({ orcamento, precos, tarefa = {} }) => {
  delete precos.margem;

  const tiposDeTarefa = useSingleTarefa(precos);

  const formState = {};
  const { schema } = tarefaSchema;
  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    formState,
    schema
  });

  useEffect(() => {
    (function() {
      const formState = {
        data: {
          tarefaId: "",
          tipoDeTarefa: "",
          descricao: "",
          quantidade: "0",
          custoUnitario: "0",
          total: "0"
        },
        errors: {}
      };
      const { data, errors } = formState;
      if (Object.keys(tarefa).length === 0) {
        setFormValues({ data, errors });
      } else {
        setFormValues({
          data: tarefa,
          errors
        });
      }
    })();
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
        const tarefaGuardada = await tarefaService.nova(orcamento._id, tarefa);
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
              defaultValue={tarefa.tipoDeTarefa}
            >
              <option></option>
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
            {Object.keys(tarefa).length === 0 && (
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
            {Object.keys(tarefa).length > 0 && (
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
