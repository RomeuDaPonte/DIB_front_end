import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import ReactTooltip from "react-tooltip";
import { renderInput } from "../common/formInputs";
import { useModalToogle } from "../common/customHooks/useModalToogle";
import { useForm } from "../common/customHooks/userForm";
import * as entidade from "../../services/entidadeService";
import * as user from "../../services/accountService";
import * as orcamento from "../../services/orcamento";

const NovoOrcamentoModal = () => {
  const modalState = {
    show: false
  };
  const [currentModalState, toogleModal] = useModalToogle(modalState);

  const formState = {
    data: {
      clienteId: "",
      descritivo: "",
      tecnicoResponsavel: "",
      elaboradoPorId: ""
    },
    listaDeClientes: [],
    listaDeUsers: [],
    currentUser: null,
    errors: {},
    formError: ""
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
      .label("Elaborado por")
  };

  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    formState,
    schema
  });

  useEffect(() => {
    (async function() {
      const { data: clientes } = await entidade.getAllClientes();
      const { data: users } = await user.getAllUsers();
      const currentUser = user.getCurrentUser();
      const data = {
        clienteId: "",
        descritivo: "",
        tecnicoResponsavel: "",
        elaboradoPorId: currentUser._id
      };
      setFormValues({
        ...formState,
        listaDeClientes: clientes,
        listaDeUsers: users,
        currentUser,
        data
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function doSubmit(e) {
    if (!canSubmit(e)) return;

    const { data } = currentFormState;
    try {
      const orcGuardado = await orcamento.novo(data);
      toogleModal();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setFormValues({
          ...currentFormState,
          formError: ex.response.data
        });
      }
    }
  }

  function renderForm() {
    if (currentFormState) {
      const { data, listaDeClientes, errors } = currentFormState;

      return (
        <form onSubmit={doSubmit}>
          <label>Cliente</label>
          <div className="form-group">
            <select
              name={"clienteId"}
              value={data.clienteId}
              onChange={handleChange}
              className="form-control"
            >
              <option value=""></option>
              {listaDeClientes.map(cliente => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.name}
                </option>
              ))}
            </select>
            {errors.clienteId && (
              <div className="alert alert-danger">{errors.clienteId}</div>
            )}
            <label>Descritivo</label>
            {renderInput(
              currentFormState,
              "descritivo",
              handleChange,
              "Descritivo"
            )}
            <label>Técnico responsavel</label>
            {renderInput(
              currentFormState,
              "tecnicoResponsavel",
              handleChange,
              "Técnico responsavel"
            )}
            {renderElaboradoPor()}
          </div>
        </form>
      );
    }
  }

  function renderElaboradoPor() {
    const { currentUser, data, listaDeUsers, errors } = currentFormState;

    return (
      <React.Fragment>
        <label>Elaborado por</label>
        <div className="form-group">
          <select
            name={"elaboradoPorId"}
            value={data.elaboradoPorId}
            onChange={handleChange}
            className="form-control"
          >
            <option value={currentUser._id}>{currentUser.name}</option>
            {listaDeUsers &&
              currentUser.role === "Administrador" &&
              listaDeUsers.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
          {errors.elaboradoPorId && (
            <div className="alert alert-danger">{errors.elaboradoPorId}</div>
          )}
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ReactTooltip className="toolTipMd" place="bottom" delayHide={500} />
      <i
        data-tip="Novo orçamento"
        className="fa fa-paper-plane fa-5x btnClick"
        onClick={toogleModal}
      ></i>
      <Modal show={currentModalState.show} onHide={toogleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo orçamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toogleModal}>
            Sair
          </Button>
          <Button variant="dark" onClick={doSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default NovoOrcamentoModal;
