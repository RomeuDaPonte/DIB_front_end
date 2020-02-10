import React, { useContext } from "react";
import { OrcamentoContext } from "../../contexts/orcamentoContext";

const DadosGeraisOrcamento = () => {
  const orcamento = useContext(OrcamentoContext);
  console.log(orcamento);

  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">
        Dados Gerais do orçamento
      </h4>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <label className="form-label">Cliente</label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-5">
            <label className="form-label">Descritivo</label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label">Técnico responsavel</label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label">Modo de pagamento</label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Prazo/Dias necessários</label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label">Orçamento elaborado por</label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label">Margem</label>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <label className="form-label">Total com margem</label>
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
