import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Joi from "joi-browser";
import Form from "../common/form";
import * as precos from "../../services/precosService";

class PrecosFormModal extends Form {
  state = {
    data: {
      automacao: "",
      consultoria: "",
      desenvolvimento: "",
      maquinacao: "",
      margem: "",
      montagem: ""
    },
    errors: [],
    formError: "",
    show: false
  };

  schema = {
    automacao: Joi.number().required(),
    consultoria: Joi.number().required(),
    desenvolvimento: Joi.number().required(),
    maquinacao: Joi.number().required(),
    margem: Joi.number()
      .required()
      .min(1),
    montagem: Joi.number().required()
  };

  async componentDidMount() {
    const { data } = await precos.getPrecos();

    this.setState({ data });

    if (data) this.props.showPrecos(data);
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
      await precos.setPrecos(data);
      this.props.showPrecos(data);
      this.handleClose();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ formError: ex.response.data });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <i className="fa fa-dollar fa-5x" onClick={this.handleShow} />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Definir preços</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>Automação</label>
              {this.renderInput("automacao", "Automação", "number")}
              <label>Consultoria</label>
              {this.renderInput("consultoria", "Consultoria", "number")}
              <label>Desenvolvimento</label>
              {this.renderInput("desenvolvimento", "Desenvolvimento", "number")}
              <label>Maquinação</label>
              {this.renderInput("maquinacao", "Maquinação", "number")}
              <label>Margem</label>
              {this.renderInput("margem", "Margem", "number")}
              <label>Montagem</label>
              {this.renderInput("montagem", "Montagem", "number")}
              {this.renderServerError()}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Sair
            </Button>
            <Button variant="dark" onClick={this.handleSubmit}>
              Definir
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default PrecosFormModal;
