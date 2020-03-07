import React from "react";

const CabecalhoListaDeTarefas = () => {
  return (
    <>
      <div className="col">
        <label className="form-label">Tarefa</label>
      </div>
      <div className="col-md-5">
        <label className="form-label">Descrção</label>
      </div>
      <div className="col-md-1">
        <label className="form-label">Qaunt/</label>
      </div>
      <div className="col-md-1">
        <label className="form-label">C/únit</label>
      </div>
      <div className="col-md-1">
        <label className="form-label">Total</label>
      </div>
      <div className="col-md-2">
        <label className="form-label">Add/Rem</label>
      </div>
    </>
  );
};

export default CabecalhoListaDeTarefas;
