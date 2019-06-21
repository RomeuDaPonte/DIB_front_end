import React, { Component } from "react";
import Joi from "joi-browser";
import logo from "../../imagens/LogInImg.jpg";
import account from "../../services/account";
import "../../estilos/login.css";

class Login extends Component {
  state = {
    data: {
      email: this.obtemValoresGuardados("email"),
      password: this.obtemValoresGuardados("password")
    },
    errors: {},
    formError: "",
    guardar: false
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email")
      .email(),
    password: Joi.string()
      .required()
      .label("Password")
  };

  obtemValoresGuardados(inputName) {
    const inputValue = localStorage.getItem(inputName);

    return inputValue ? inputValue : "";
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name: propertyName, value }) => {
    const obj = { [propertyName]: value };
    const schema = { [propertyName]: this.schema[propertyName] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  guardarDados = ({ currentTarget: input }) => {
    let guardar = this.state.guardar;
    guardar = input.checked;
    this.setState({ guardar });
  };

  submit = async e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    if (this.state.guardar) {
      localStorage.setItem("email", this.state.data.email);
      localStorage.setItem("password", this.state.data.password);
    }

    try {
      const { data } = this.state;
      await account.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ formError: ex.response.data });
      }
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 p-0">
            <img className="loginImg" src={logo} alt="#" />
          </div>
          <div className="col-md-2 p-0">
            <form onSubmit={this.submit} className="logInForm">
              <h3 className="hStyle">
                Entrar <i className="fa fa-lock ml-2" />
              </h3>
              <div className="form-group">
                <input
                  style={{
                    border: "1px solid black",
                    backgroundColor: "#212020"
                  }}
                  type="email"
                  className="form-control"
                  placeholder="Emal"
                  name="email"
                  value={this.state.data.email}
                  onChange={this.handleChange}
                />
                {errors["email"] && (
                  <div className="alert alert-danger">{errors["email"]}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  style={{
                    border: "1px solid black",
                    backgroundColor: "#212020"
                  }}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.data.password}
                  onChange={this.handleChange}
                />
                {errors["password"] && (
                  <div className="alert alert-danger">{errors["password"]}</div>
                )}
              </div>
              <div className="form-group">
                {this.state.formError && (
                  <div className="alert alert-danger">
                    {this.state.formError}
                  </div>
                )}
              </div>
              <div className="form-check p-0">
                <input
                  type="checkbox"
                  id="guardar"
                  className="form-check-input"
                  onChange={this.guardarDados}
                />
                <label htmlFor="guardar" className="form-check-label ml-4 lbl">
                  Guardar
                </label>

                <button type="submit" className="btn btn-login">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
