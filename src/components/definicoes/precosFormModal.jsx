import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Joi from "joi-browser";
import { useModalToogle } from "../../customHooks/useModalToogle";
import { useForm } from "../../customHooks/userForm";
import { renderInput } from "../common/formInputs";
import * as precos from "../../services/precosService";

const PrecosFormModal = props => {
  const modalState = {
    show: false
  };
  const [currentModalState, toogleModal] = useModalToogle(modalState);

  const initialState = {
    data: {
      automacao: "",
      consultoria: "",
      desenvolvimento: "",
      maquinacao: "",
      margem: "",
      montagem: ""
    },
    errors: [],
    formError: ""
  };

  const schema = {
    automacao: Joi.number().required(),
    consultoria: Joi.number().required(),
    desenvolvimento: Joi.number().required(),
    maquinacao: Joi.number().required(),
    margem: Joi.number()
      .required()
      .min(1),
    montagem: Joi.number().required()
  };

  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    initialState,
    schema
  });

  useEffect(() => {
    setFormValues({
      ...initialState,
      data: props.precos
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.precos]);

  async function doSubmit(e) {
    if (!canSubmit(e)) return;

    const { data } = currentFormState;
    try {
      await precos.setPrecos(data);
      props.updatePrecos(data);
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
  return (
    <React.Fragment>
      <i className="fa fa-dollar fa-5x" onClick={toogleModal} />

      <Modal show={currentModalState.show} onHide={toogleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Definir preços </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={doSubmit}>
            <label>Automação {props.precos.automacao}</label>
            {renderInput(
              currentFormState,
              "automacao",
              handleChange,
              "Automação",
              "number"
            )}
            <label>Consultoria</label>
            {renderInput(
              currentFormState,
              "consultoria",
              handleChange,
              "Consultoria",
              "number"
            )}
            <label>Desenvolvimento</label>
            {renderInput(
              currentFormState,
              "desenvolvimento",
              handleChange,
              "Desenvolvimento",
              "number"
            )}
            <label>Maquinação</label>
            {renderInput(
              currentFormState,
              "maquinacao",
              handleChange,
              "Maquinação",
              "number"
            )}
            <label>Margem</label>
            {renderInput(
              currentFormState,
              "margem",
              handleChange,
              "Margem",
              "number"
            )}
            <label>Montagem</label>
            {renderInput(
              currentFormState,
              "montagem",
              handleChange,
              "Montagem",
              "number"
            )}
            {currentFormState.formError && (
              <div className="alert alert-danger">
                {currentFormState.formError}
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toogleModal}>
            Sair
          </Button>
          <Button variant="dark" onClick={doSubmit}>
            Definir
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default PrecosFormModal;
