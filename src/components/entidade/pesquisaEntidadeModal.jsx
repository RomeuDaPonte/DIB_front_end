import React from "react";
import Modal from "react-bootstrap/Modal";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import { pesquisar } from "../../services/entidadeService";
import Form from "../common/form";

class PesquisaEntidadeModal extends Form {
  state = {
    data: {
      name: "",
      nif: "",
      morada: "",
      codigoPostal: "",
      localidade: ""
    },
    show: false,
    errors: ""
  };

  schema = {
    name: Joi.any(),
    nif: Joi.any(),
    morada: Joi.any(),
    codigoPostal: Joi.any(),
    localidade: Joi.any()
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  async doSubmit() {
    const { data } = this.state;
    const resultadoDaPesquisa = await pesquisar(data);

    this.props.pesquisar(resultadoDaPesquisa.data);
    this.handleClose();
  }

  render() {
    return (
      <React.Fragment>
        <i className="fa fa-search fa-5x" onClick={this.handleShow}></i>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Pesquisar entidade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>Nome</label>
              {this.renderInput("name", "Nome da entidade")}
              <label>Nif</label>
              {this.renderInput("nif", "Nif")}
              <label>Morada</label>
              {this.renderInput("morada", "Morada")}
              <label>Codigo postal</label>
              {this.renderInput("codigoPostal", "Código postal")}
              <label>Localidade</label>
              {this.renderInput("localidade", "Localidade")}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Sair
            </Button>
            <Button variant="dark" onClick={this.handleSubmit}>
              Pesquisar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default PesquisaEntidadeModal;
