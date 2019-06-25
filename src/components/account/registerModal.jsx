import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RegisterFrom from "./registerForm";

class RegisterModal extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    const show = false;
    this.setState({ show });
  };

  handleShow = () => {
    const show = true;
    this.setState({ show });
  };

  render() {
    return (
      <React.Fragment>
        <i className="fa fa-user-plus fa-5x" onClick={this.handleShow} />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Novo utilizador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterFrom />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Sair
            </Button>
            <Button variant="dark" onClick={this.handleClose}>
              Criar user
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RegisterModal;
