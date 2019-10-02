import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import * as entidade from "../../services/entidadeService";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import { renderInput } from "../common/formInputs";
import { useModalToogle } from "../common/customHooks/useModalToogle";
import { useForm } from "../common/customHooks/userForm";

const EntidadeModal = props => {
  const modalState = {
    show: false
  };
  const [currentModalState, toogleModal] = useModalToogle(modalState);

  const formState = {
    data: {
      name: "",
      tipo: "",
      nif: "",
      morada: "",
      codigoPostal: "",
      localidade: "",
      condicoesDePagamento: "",
      _id: "",
      __v: ""
    },
    condicoesDePagamentoDisponiveis: [],
    tiposDeEntidades: [],
    errors: {},
    formError: ""
  };

  const schema = {
    name: Joi.string()
      .required()
      .label("Nome"),
    tipo: Joi.string()
      .required()
      .label("Tipo de entidade"),
    nif: Joi.any(),
    morada: Joi.any(),
    codigoPostal: Joi.any(),
    localidade: Joi.any(),
    condicoesDePagamento: Joi.string()
      .required()
      .label("Concições de pagamento"),
    _id: Joi.any(),
    __v: Joi.any()
  };

  const [currentFormState, handleChange, canSubmit, setFormValues] = useForm({
    formState,
    schema
  });

  useEffect(() => {
    (async function() {
      const {
        data: condicoesDePagamentoDisponiveis
      } = await entidade.getCondicoesDePagamento();
      const { data: tiposDeEntidades } = await entidade.getTiposDeEntidade();

      let values = formState.data;
      if (props.entidade) values = props.entidade;

      setFormValues({
        ...formState,
        data: values,
        tiposDeEntidades,
        condicoesDePagamentoDisponiveis
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderIcon() {
    if (props.entidade)
      return <i className="fa fa-edit btnClick" onClick={toogleModal} />;

    return <i className="fa fa-users fa-5x" onClick={toogleModal} />;
  }

  async function doSubmit(e) {
    if (!canSubmit(e)) return;

    const { data } = currentFormState;

    let dadosEntidade = {};
    if (data._id) dadosEntidade = await entidade.editar(data);
    else dadosEntidade = await entidade.novaEntidade(data);

    props.updateListaDeEntidades(dadosEntidade.data);
    toogleModal();
  }

  function renderForm() {
    if (currentFormState) {
      const {
        data,
        tiposDeEntidades,
        condicoesDePagamentoDisponiveis,
        errors,
        formError
      } = currentFormState;

      return (
        <form onSubmit={doSubmit}>
          <label>Nome</label>
          {renderInput(
            currentFormState,
            "name",
            handleChange,
            "Nome da entidade"
          )}
          <label>Tipo de entidade</label>
          <div className="form-group">
            <select
              name={"tipo"}
              value={data.tipo}
              onChange={handleChange}
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
          {renderInput(currentFormState, "nif", handleChange, "Nif")}
          <label>Morada</label>
          {renderInput(currentFormState, "morada", handleChange, "Morada")}
          <label>Codigo postal</label>
          {renderInput(
            currentFormState,
            "codigoPostal",
            handleChange,
            "Código postal"
          )}
          <label>Localidade</label>
          {renderInput(
            currentFormState,
            "localidade",
            handleChange,
            "Localidade"
          )}
          <label>Condições de pagamento</label>
          <div className="form-group">
            <select
              name={"condicoesDePagamento"}
              value={data.condicoesDePagamento}
              onChange={handleChange}
              className="form-control"
            >
              <option value=""> </option>
              {condicoesDePagamentoDisponiveis.map(condicaoDePagamento => (
                <option key={condicaoDePagamento} value={condicaoDePagamento}>
                  {condicaoDePagamento}
                </option>
              ))}
            </select>
            {errors.condicoesDePagamento && (
              <div className="alert alert-danger">
                {errors.condicoesDePagamento}
              </div>
            )}
          </div>
          {formError && <div className="alert alert-danger">{formError}</div>}
        </form>
      );
    }
  }

  return (
    <React.Fragment>
      {renderIcon()}
      <Modal show={currentModalState.show} onHide={toogleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Entidade</Modal.Title>
        </Modal.Header>
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

export default EntidadeModal;

// class EntidadeModal extends Form {
//   state = {
//     data: {
//       name: "",
//       tipo: "",
//       nif: "",
//       morada: "",
//       codigoPostal: "",
//       localidade: "",
//       condicoesDePagamento: "",
//       _id: "",
//       __v: ""
//     },
//     condicoesDePagamentoDisponiveis: [],
//     tiposDeEntidades: [],
//     errors: [],
//     formError: "",
//     show: false
//   };

//   schema = {
//     name: Joi.string()
//       .required()
//       .label("Nome"),
//     tipo: Joi.string()
//       .required()
//       .label("Tipo de entidade"),
//     nif: Joi.any(),
//     morada: Joi.any(),
//     codigoPostal: Joi.any(),
//     localidade: Joi.any(),
//     condicoesDePagamento: Joi.string()
//       .required()
//       .label("Concições de pagamento"),
//     _id: Joi.any(),
//     __v: Joi.any()
//   };

//   async componentDidMount() {
//     const {
//       data: condicoesDePagamentoDisponiveis
//     } = await entidade.getCondicoesDePagamento();
//     const { data: tiposDeEntidades } = await entidade.getTiposDeEntidade();

//     this.setState({ tiposDeEntidades, condicoesDePagamentoDisponiveis });

//     if (this.props.entidadeId) {
//       const { data } = await entidade.getSingleEntidade(this.props.entidadeId);
//       this.setState({ data });
//     }
//   }

//   handleClose = () => {
//     this.setState({ show: false });
//   };

//   handleShow = () => {
//     this.setState({ show: true });
//   };

//   renderIcon = () => {
//     if (this.props.entidadeId)
//       return <i className="fa fa-edit btnClick" onClick={this.handleShow} />;

//     return <i className="fa fa-users fa-5x" onClick={this.handleShow} />;
//   };

//   async doSubmit() {
//     const { data } = this.state;

//     let dadosEntidade = {};
//     if (data._id) dadosEntidade = await entidade.editar(data);
//     else dadosEntidade = await entidade.novaEntidade(data);

//     this.props.updateListaDeEntidades(dadosEntidade.data);
//     this.handleClose();
//   }

//   render() {
//     const {
//       data,
//       condicoesDePagamentoDisponiveis,
//       tiposDeEntidades,
//       errors
//     } = this.state;

//     return (
//       <React.Fragment>
//         {this.renderIcon()}

//         <Modal show={this.state.show} onHide={this.handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Nova Entidade</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form onSubmit={this.handleSubmit}>
//               <label>Nome</label>
//               {this.renderInput("name", "Nome da entidade")}
//               <label>Tipo de entidade</label>
//               <div className="form-group">
//                 <select
//                   name={"tipo"}
//                   value={data.tipo}
//                   onChange={this.handleChange}
//                   className="form-control"
//                 >
//                   <option value=""> </option>
//                   {tiposDeEntidades.map(tipo => (
//                     <option key={tipo} value={tipo}>
//                       {tipo}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.tipo && (
//                   <div className="alert alert-danger">{errors.tipo}</div>
//                 )}
//               </div>
//               <label>Nif</label>
//               {this.renderInput("nif", "Nif")}
//               <label>Morada</label>
//               {this.renderInput("morada", "Morada")}
//               <label>Codigo postal</label>
//               {this.renderInput("codigoPostal", "Código postal")}
//               <label>Localidade</label>
//               {this.renderInput("localidade", "Localidade")}
//               <label>Condições de pagamento</label>
//               <div className="form-group">
//                 <select
//                   name={"condicoesDePagamento"}
//                   value={data.condicoesDePagamento}
//                   onChange={this.handleChange}
//                   className="form-control"
//                 >
//                   <option value=""> </option>
//                   {condicoesDePagamentoDisponiveis.map(condicaoDePagamento => (
//                     <option
//                       key={condicaoDePagamento}
//                       value={condicaoDePagamento}
//                     >
//                       {condicaoDePagamento}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.condicoesDePagamento && (
//                   <div className="alert alert-danger">
//                     {errors.condicoesDePagamento}
//                   </div>
//                 )}
//               </div>
//               {this.renderServerError()}
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={this.handleClose}>
//               Sair
//             </Button>
//             <Button variant="dark" onClick={this.handleSubmit}>
//               Guardar
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </React.Fragment>
//     );
//   }
// }

// export default EntidadeModal;
