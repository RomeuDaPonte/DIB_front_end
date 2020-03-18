import React, { useEffect, useContext } from "react";
import CabecalhoListaDeTarefas from "./cabecalhoListaDeTarefas";
import { OrcamentoContext } from "../../contexts/orcamentoContext";
import { useForm } from "../common/customHooks/userForm";
import { renderInput } from "../common/formInputs";
import tarefaSchema from "../../schemas/orcamento/tarefaSchema";
import useListaDeNomesDeTarefas from "./custmoStates/listaDeTarefasState";

const ListaDeTarefas = () => {
  const { precos } = useContext(OrcamentoContext);
  delete precos.margem;

  const tiposDeTarefa = useListaDeNomesDeTarefas(precos);

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
          tarefa: "",
          descricao: "",
          quantidade: "",
          custoUnitario: "0",
          total: "0"
        },
        errors: {}
      };
      const { data, errors } = formState;
      setFormValues({ data, errors });
    })();
  }, [setFormValues]);

  function onTarefaChange(e) {
    const { data: tarefa } = currentFormState;
    if (e.target.value) tarefa.custoUnitario = precos[e.target.value];
    else tarefa.custoUnitario = "0";

    setFormValues({
      ...currentFormState,
      data: tarefa
    });
  }

  function canRenderTarefaRow() {
    if (currentFormState && tiposDeTarefa.nomes.length > 0) return true;
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
          <div className="row">
            <div className="col">
              <select
                name="tarefa"
                id="tarefa"
                className="form-control form-control-lg"
                onChange={onTarefaChange}
              >
                <option></option>
                {tiposDeTarefa.nomes.map(n => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
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
              {renderInput(
                currentFormState,
                "quantidade",
                handleChange,
                "",
                "",
                "form-control-lg"
              )}
            </div>
            <div className="col-md-1">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  readOnly="readOnly"
                  value={currentFormState.data.custoUnitario}
                />
              </div>
            </div>
            <div className="col-md-1">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  readOnly="readOnly"
                  value={currentFormState.data.total}
                />
              </div>
            </div>
            <div className="col-md-2">
              <i
                style={{ color: "green" }}
                className="fa fa-arrow-circle-down fa-3x"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaDeTarefas;
