import React from "react";
import Form from "../common/form";

class RegistirForm extends Form {
  state = {
    data: { username: "", funcao: "", email: "" },
    funcoes: [],
    errors: [],
    formError: ""
  };

  render() {
    return (
      <React.Fragment>
        <form action="">
          {this.renderInput("username", "Nome do utilizador")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegistirForm;
