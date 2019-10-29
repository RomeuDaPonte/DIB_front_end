import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import { renderInput } from "../common/formInputs";
import { useModalToogle } from "../common/customHooks/useModalToogle";
import { useForm } from "../common/customHooks/userForm";

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

  async function doSubmit(e) {
    console.log("submited");
  }

  return (
    <React.Fragment>
      <i className="fa fa-paper-plane fa-5x btnClick" onClick={toogleModal}></i>
      <Modal show={currentModalState.show} onHide={toogleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo orçamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Form aqui!</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toogleModal}>
            Sair
          </Button>
          <Button variant="dark" onClick={toogleModal}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default NovoOrcamentoModal;
