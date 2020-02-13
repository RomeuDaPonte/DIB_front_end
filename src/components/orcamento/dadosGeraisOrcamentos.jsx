import React, { useContext, useEffect, useState } from "react";
import Joi from "joi-browser";
import { useForm } from "../common/customHooks/userForm";
import { OrcamentoContext } from "../../contexts/orcamentoContext";
import * as entidade from "../../services/entidadeService";
import * as user from "../../services/accountService";
import * as orcamentoService from "../../services/orcamentoDadosGeraisService";
import { renderInput, renderSelect } from "../common/formInputs";

const DadosGeraisOrcamento = () => {
  const orcamentoPage = useContext(OrcamentoContext);

  const [condicoesDePagamento, setCondicoesDePagamento] = useState({
    arrayDeCondicoesDePagamento: []
  });
  useEffect(() => {
    (async function() {
      const {
        data: listaDeCondicoesDePagamento
      } = await entidade.getCondicoesDePagamento();
      setCondicoesDePagamento(listaDeCondicoesDePagamento);
    })();
  }, []);

  const [currentUser, setCurrentUser] = useState({ user: {} });
  useEffect(() => {
    (async function() {
      const userLogado = user.getCurrentUser();
      setCurrentUser(userLogado);
    })();
  }, []);

  const [users, setUsers] = useState({ arrayDeUsers: [] });
  useEffect(() => {
    (async function() {
      const { data: users } = await user.getAllUsers();
      setUsers(users);
    })();
  }, []);

  const [clientes, setClientes] = useState({ arrayDeClientes: [] });
  useEffect(() => {
    (async function() {
      const { data: clientesDaBd } = await entidade.getAllClientes();
      setClientes(clientesDaBd);
    })();
  }, []);

  const [orcamento, setOrcamento] = useState({ orcamento: {} });
  useEffect(() => {
    (async function() {
      const { data: orcamento } = await orcamentoService.get(
        orcamentoPage.currentPageState.orcamentoId
      );
      setOrcamento(orcamento);
    })();
  }, [orcamentoPage.currentPageState.orcamentoId]);

  const formState = {
    data: {
      clienteId: "",
      descritivo: "",
      tecnicoResponsavel: "",
      elaboradoPorId: "",
      condicoesDePagamento: "",
      diasParaCompletarObra: "",
      margem: "",
      totalComMargem: ""
    },
    errors: {}
  };

  const schema = {
    clienteId: Joi.string()
      .required()
      .label("Cliente"),
    descritivo: Joi.string()
      .required()
      .label("Descritivo"),
    tecnicoResponsavel: Joi.string()
      .required()
      .label("Técnico responsavel"),
    elaboradoPorId: Joi.string()
      .required()
      .label("Elaborado por"),
    modoDePagamento: Joi.string()
      .required()
      .label("Modo de pagamento"),
    diasParaCompletarObra: Joi.number()
      .integer()
      .min(1)
      .label("Dias para completar"),
    margem: Joi.number()
      .integer()
      .min(1),
    totalComMargem: Joi.any()
  };

  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    formState,
    schema
  });

  useEffect(() => {
    (async function() {
      if (orcamento.cliente && clientes) {
        const cliente = clientes.find(cli => cli._id === orcamento.cliente._id);
        const data = {
          clienteId: orcamento.cliente._id,
          descritivo: orcamento.descritivo,
          tecnicoResponsavel: orcamento.tecnicoResponsavel,
          elaboradoPorId: orcamento.elaboradoPorId
            ? orcamento.elaboradoPorId
            : currentUser._id,
          condicoesDePagamento: orcamento.condicoesDePagamento
            ? orcamento.condicoesDePagamento
            : cliente.condicoesDePagamento,
          diasParaCompletarObra: 1,
          margem: 30,
          totalComMargem: 1000
        };
        const errors = {};
        setFormValues({ data, errors });
      }
    })();
  }, [orcamento, currentUser, setFormValues, clientes]);

  function handleClientChange({ currentTarget: input }) {
    const { data, errors } = currentFormState;
    const clienteSelecionado = clientes.find(c => c._id === input.value);
    data[input.name] = input.value;
    data.condicoesDePagamento = clienteSelecionado.condicoesDePagamento;
    setFormValues({
      data,
      errors
    });
  }

  function renderForm() {
    if (currentFormState && condicoesDePagamento) {
      return (
        <>
          <div className="row">
            <div className="col">
              <label className="form-label">Cliente</label>
              {renderSelect(
                "clienteId",
                clientes,
                handleClientChange,
                currentFormState.errors.clienteId,
                currentFormState.data.clienteId,
                "form-control-lg"
              )}
            </div>
            <div className="col-5">
              <label className="form-label">Descritivo</label>
              {renderInput(
                currentFormState,
                "descritivo",
                handleChange,
                "",
                "",
                "form-control-lg"
              )}
            </div>
            <div className="col">
              <label className="form-label">Técnico responsavel</label>
              {renderInput(
                currentFormState,
                "tecnicoResponsavel",
                handleChange,
                "",
                "",
                "form-control-lg"
              )}
            </div>
            <div className="col">
              <label className="form-label">Condiçoes de pagamento</label>
              <select
                name="condicoesDePagamento"
                id="condicoesDePagamento"
                className="form-control form-control-lg"
              >
                <option value={currentFormState.data.condicoesDePagamento}>
                  {currentFormState.data.condicoesDePagamento}
                </option>
                {condicoesDePagamento.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {currentFormState.error && (
                <div className="alert alert-danger">
                  {currentFormState.error.condicoesDePagamento}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Prazo/Dias necessários</label>
              {renderInput(
                currentFormState,
                "diasParaCompletarObra",
                handleChange,
                "",
                "number",
                "form-control-lg"
              )}
            </div>
            <div className="col">
              <label className="form-label">Orçamento elaborado por</label>
              {renderSelect(
                "elaboradoPorId",
                users,
                handleChange,
                currentFormState.errors.elaboradoPorId,
                currentFormState.data.elaboradoPorId,
                "form-control-lg"
              )}
            </div>
            <div className="col">
              <label className="form-label">Margem</label>
              {renderInput(
                currentFormState,
                "margem",
                handleChange,
                "",
                "",
                "form-control-lg"
              )}
            </div>
            <div className="col">
              <label className="form-label">Total com margem</label>
              <label className="form-control form-control-lg">
                {currentFormState.data.totalComMargem} €
              </label>
            </div>
          </div>{" "}
        </>
      );
    }
  }

  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">
        Dados Gerais do orçamento
      </h4>
      <div className="card-body">{renderForm()}</div>
    </div>
  );
};

export default DadosGeraisOrcamento;

// return (
//   <div>
//     Ola {currentFormState && <h1>{currentFormState.data.descritivo}</h1>}
//   </div>
// );
