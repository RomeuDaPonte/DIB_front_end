import React from "react";
import Modal from "react-bootstrap/Modal";
import Joi from "joi-browser";
import * as account from "../../services/accountService";
import Button from "react-bootstrap/Button";
import Form from "../common/form";

class RegisterModal extends Form {
  state = {
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

  schema = {
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

  async componentDidMount() {
    const { data } = await account.getRoles();

    this.setState({ funcoes: data });
  }

  handleClose = () => {
    const show = false;
    this.setState({ show });
  };

  handleShow = () => {
    const show = true;
    this.setState({ show });
  };

  async doSubmit() {
    try {
      const { data } = this.state;
      const { data: newUser } = await account.newUser(data);
      this.props.novoUser(newUser);
      this.handleClose();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ formError: ex.response.data });
      }
    }
  }

  render() {
    const { data, funcoes, errors } = this.state;

    return (
      <React.Fragment>
        <i className="fa fa-user-plus fa-5x" onClick={this.handleShow} />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Novo utilizador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>Nome</label>
              {this.renderInput("username", "Nome do utilizador")}
              <label>Função</label>
              <div className="form-group">
                <select
                  name={"funcao"}
                  value={data.funcao}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option value="">Escolha um função </option>
                  {funcoes.map(funcao => (
                    <option key={funcao} value={funcao}>
                      {funcao}
                    </option>
                  ))}
                </select>
                {errors.funcao && (
                  <div className="alert alert-danger">{errors.funcao}</div>
                )}
              </div>
              <label>Eamil</label>
              {this.renderInput("email", "Email")}
              <label>Password</label>
              {this.renderInput("password", "password", "Password")}
              <label>Confirmar password</label>
              {this.renderInput(
                "passwordConfirmation",
                "Confirmar password",
                "password"
              )}
              {this.renderServerError()}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Sair
            </Button>
            <Button variant="dark" onClick={this.handleSubmit}>
              Criar user
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RegisterModal;
