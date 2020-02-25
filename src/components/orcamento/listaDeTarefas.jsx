import React from "react";

const ListaDeTarefas = () => {
  return (
    <div className="card m-2">
      <h4 className="card-header text-white bg-dark">Lista de tarefas</h4>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <label className="form-label">Tipo de tarefa</label>
          </div>
          <div className="col-md-4">
            <label className="form-label">Descritivo</label>
          </div>
          <div className="col">
            <label className="form-label">P/Unitário</label>
          </div>
          <div className="col">
            <label className="form-label">Quantidade</label>
          </div>
          <div className="col">
            <label className="form-label">Total</label>
          </div>
          <div className="col">
            <label className="form-label">Opções</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <input className="form-control form-control-lg" type="text" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input className="form-control form-control-lg" type="text" />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <input className="form-control form-control-lg" type="text" />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <input className="form-control form-control-lg" type="text" />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <input className="form-control form-control-lg" type="text" />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <input className="form-control form-control-lg" type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaDeTarefas;
