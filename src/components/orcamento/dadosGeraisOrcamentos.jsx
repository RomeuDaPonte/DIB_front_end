import React from "react";

const DadosGeraisOrcamento = () => {
  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">
        Dados Gerais do orçamento
      </h4>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <label className="form-label" for="exampleInputEmail1">
              Cliente
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-5">
            <label className="form-label" for="exampleInputEmail1">
              Descritivo
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label" for="exampleInputEmail1">
              Técnico responsavel
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label" for="exampleInputEmail1">
              Modo de pagamento
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label" for="exampleInputEmail1">
              Prazo/Dias necessários
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label" for="exampleInputEmail1">
              Orçamento elaborado por
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label" for="exampleInputEmail1">
              Margem
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label" for="exampleInputEmail1">
              Total com margem
            </label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DadosGeraisOrcamento;
