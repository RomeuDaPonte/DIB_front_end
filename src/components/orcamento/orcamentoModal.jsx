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
import * as orcamentoDadosGerais from "../../services/orcamentoDadosGeraisService";
import ModalTitle from "react-bootstrap/ModalTitle";

const OrcamentoModal = props => {
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

  function initializeData() {
    const { orcamento } = props;
    const currentUser = user.getCurrentUser();
    if (!orcamento) {
      return {
        clienteId: "",
        descritivo: "",
        tecnicoResponsavel: "",
        elaboradoPorId: currentUser._id
      };
    }
    return {
      clienteId: orcamento.cliente._id,
      descritivo: orcamento.descritivo,
      tecnicoResponsavel: orcamento.tecnicoResponsavel,
      elaboradoPorId: orcamento.elaboradoPor._id
    };
  }

  useEffect(() => {
    (async function() {
      const { data: clientes } = await entidade.getAllClientes();
      const { data: users } = await user.getAllUsers();
      const currentUser = user.getCurrentUser();
      const data = initializeData();
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

    if (props.orcamento) {
      editarOrcamento();
      return;
    }

    const { data } = currentFormState;
    try {
      const { data: orcGuardado } = await orcamentoDadosGerais.novo(data);
      props.addNovoOrcamento(orcGuardado);
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

  async function editarOrcamento() {
    const { orcamento } = props;
    const { data } = currentFormState;

    try {
      const { data: orcamentoEditado } = await orcamentoDadosGerais.editar(
        orcamento._id,
        data
      );
      console.log(orcamentoEditado);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setFormValues({
          ...currentFormState,
          formError: ex.response.data
        });
      }
    }
  }

  function renderNomoDoCliente() {
    const { orcamento } = props;
    if (orcamento) {
      return (
        <option value={orcamento.clienteId}>{orcamento.cliente.name}</option>
      );
    }
    return <option value=""></option>;
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
              {renderNomoDoCliente()}
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

  function renderIcon() {
    const { orcamento } = props;
    if (!orcamento) {
      return (
        <React.Fragment>
          <ReactTooltip
            id="NovoOrcamento"
            className="toolTipMd"
            place="bottom"
            delayHide={500}
          />
          <i
            data-for="NovoOrcamento"
            data-tip="Novo orçamento"
            className="fa fa-paper-plane fa-5x btnClick"
            onClick={toogleModal}
          ></i>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <ReactTooltip
          id="EditarOrcamento"
          className="toolTip"
          place="top"
          delayHide={500}
        />
        <i
          data-tip="Editar orçamento"
          data-for="EditarOrcamento"
          className="fa fa-edit btnClick"
          onClick={toogleModal}
        ></i>
      </React.Fragment>
    );
  }

  function renderModalTitle() {
    const { orcamento } = props;
    if (!orcamento) {
      return <ModalTitle>Novo Orçamento</ModalTitle>;
    }
    return <ModalTitle>Editar orçamento {orcamento.numero}</ModalTitle>;
  }

  return (
    <React.Fragment>
      {renderIcon()}
      <Modal show={currentModalState.show} onHide={toogleModal}>
        <Modal.Header closeButton>{renderModalTitle()}</Modal.Header>
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

export default OrcamentoModal;
