import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Joi from "joi-browser";
import * as account from "../../services/accountService";
import Button from "react-bootstrap/Button";
import { useModalToogle } from "../../customHooks/useModalToogle";
import { useForm } from "../../customHooks/userForm";
import { renderInput } from "../common/formInputs";

const RegisterModal = props => {
  const modalState = {
    show: false
  };
  const [currentModalState, toogleModal] = useModalToogle(modalState);

  const initialState = {
    data: {
      username: "",
      funcao: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    funcoes: [],
    errors: [],
    formError: "",
    show: false
  };

  const schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    funcao: Joi.string()
      .valid("Administrador", "Geral", "Sócio")
      .required()
      .label("função"),
    email: Joi.string()
      .email()
      .required()
      .label("email"),
    password: Joi.string()
      .min(5)
      .required(),
    passwordConfirmation: Joi.ref("password")
  };

  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    initialState,
    schema
  });

  useEffect(() => {
    (async function() {
      const { data } = await account.getRoles();
      setFormValues({
        ...initialState,
        funcoes: data
      });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function doSubmit(e) {
    if (!canSubmit(e)) return;
    try {
      const { data: user } = currentFormState;
      const { data: newUser } = await account.newUser(user);
      props.novoUser(newUser);
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
      <i className="fa fa-user-plus fa-5x" onClick={toogleModal} />

      <Modal show={currentModalState.show} onHide={toogleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo utilizador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={doSubmit}>
            <label>Nome</label>
            {renderInput(
              currentFormState,
              "username",
              handleChange,
              "Nome do utilizador"
            )}
            <label>Função</label>
            <div className="form-group">
              <select
                name={"funcao"}
                value={currentFormState.data.funcao}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Escolha um função </option>
                {currentFormState.funcoes.map(funcao => (
                  <option key={funcao} value={funcao}>
                    {funcao}
                  </option>
                ))}
              </select>
              {currentFormState.errors.funcao && (
                <div className="alert alert-danger">
                  {currentFormState.errors.funcao}
                </div>
              )}
            </div>
            <label>Eamil</label>
            {renderInput(currentFormState, "email", handleChange, "Email")}
            <label>Password</label>
            {renderInput(
              currentFormState,
              "password",
              handleChange,
              "password",
              "Password"
            )}
            <label>Confirmar password</label>
            {renderInput(
              currentFormState,
              "passwordConfirmation",
              handleChange,
              "Confirmar password",
              "password"
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
            Criar user
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default RegisterModal;
