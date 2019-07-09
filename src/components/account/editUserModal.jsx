import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Joi from "joi-browser";
import Form from "../common/form";
import * as account from "../../services/accountService";

class EditUserModal extends Form {
  state = {
    data: {
      role: "",
      password: "",
      passwordConfirmation: ""
    },
    username: this.props.user.name,
    userId: this.props.user._id,
    roles: [],
    errors: [],
    formError: "",
    show: false
  };

  schema = {
    role: Joi.any().when("password", {
      is: Joi.string().required(),
      then: Joi.any(),
      otherwise: Joi.valid("Sócio", "Administrador", "Geral") //vai para aqui se a password estiver vazia
    }),
    password: Joi.any(),
    passwordConfirmation: Joi.ref("password")
  };

  async componentDidMount() {
    const { data: roles } = await account.getRoles();

    const index = roles.indexOf(this.props.user.role);
    roles.splice(index, 1);

    this.setState({ roles });
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
      await account.updateUser(this.state.userId, data);
      this.props.updateUser(data, this.state.userId);
      this.handleClose();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ formError: ex.response.data });
      }
    }
  }

  render() {
    const { data, roles, errors } = this.state;

    return (
      <React.Fragment>
        <i className="fa fa-edit btnClick" onClick={this.handleShow} />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar user {this.state.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>Função</label>
              <div className="form-group">
                <select
                  name={"role"}
                  value={data.role}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option value="">{this.props.user.role} </option>
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <div className="alert alert-danger">{errors.role}</div>
                )}
              </div>
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
              Editar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditUserModal;
