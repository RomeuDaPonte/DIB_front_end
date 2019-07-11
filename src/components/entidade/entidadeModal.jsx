import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import * as entidade from "../../services/entidadeService";
import Button from "react-bootstrap/Button";
import Form from "../common/form";

class EntidadeModal extends Form {
  state = {
    data: {
      name: "",
      nif: "",
      morada: "",
      codigoPostal: "",
      localidade: "",
      condicoesDePagamento: "",
      tipo: ""
    },
    condicoesDePagamentoDisponiveis: [],
    tiposDeEntidades: [],
    errors: [],
    formError: "",
    show: false
  };

  async componentDidMount() {
    const {
      data: condicoesDePagamentoDisponiveis
    } = await entidade.getCondicoesDePagamento();
    const { data: tiposDeEntidades } = await entidade.getTiposDeEntidade();

    this.setState({ tiposDeEntidades, condicoesDePagamentoDisponiveis });
  }

  handleClose = () => {
    const show = false;
    this.setState({ show });
  };

  handleShow = () => {
    const show = true;
    this.setState({ show });
  };

  render() {
    const {
      data,
      condicoesDePagamentoDisponiveis,
      tiposDeEntidades,
      errors
    } = this.state;

    return (
      <React.Fragment>
        <i className="fa fa-users fa-5x" onClick={this.handleShow} />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Entidade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <label>Nome</label>
              {this.renderInput("name", "Nome da entidade")}
              <label>Tipo de entidade</label>
              <div className="form-group">
                <select
                  name={"tipo"}
                  value={data.tipo}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option value=""> </option>
                  {tiposDeEntidades.map(tipo => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
                {errors.tipo && (
                  <div className="alert alert-danger">{errors.tipo}</div>
                )}
              </div>
              <label>Nif</label>
              {this.renderInput("nif", "Nif")}
              <label>Morada</label>
              {this.renderInput("morada", "Morada")}
              <label>Codigo postal</label>
              {this.renderInput("codigoPostal", "Código postal")}
              <label>Localidade</label>
              {this.renderInput("localidade", "Localidade")}
              <label>Condições de pagamento</label>
              <div className="form-group">
                <select
                  name={"condicoesDePagamento"}
                  value={data.condicoesDePagamento}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option value=""> </option>
                  {condicoesDePagamentoDisponiveis.map(condicaoDePagamento => (
                    <option
                      key={condicaoDePagamento}
                      value={condicaoDePagamento}
                    >
                      {condicaoDePagamento}
                    </option>
                  ))}
                </select>
                {errors.condicaoDePagamento && (
                  <div className="alert alert-danger">
                    {errors.condicaoDePagamento}
                  </div>
                )}
              </div>
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

export default EntidadeModal;
