import React from "react";
import Form from "../common/form";

class Registir extends Form {
  state = {
    data: { username: "", funcao: "", email: "" },
    funcoes: [],
    errors: [],
    formError: ""
  };

  render() {
    return (
      <React.Fragment>
        <div className="headerStyles" />
        <div className="card m-3">
          <div className="card-body p-0">
            <h3 className="card-title bg-dark text-white p-2">
              Adicionar utilizador
            </h3>
            <div className="row justify-content-md-center p-2">
              <form action="" className="col-4">
                {this.renderInput("username", "Nome do utilizador")}
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password")}
                <div className="form-row pl-1 pr-1">
                  <button className="btn btn-dark col-12">Adicionar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Registir;
