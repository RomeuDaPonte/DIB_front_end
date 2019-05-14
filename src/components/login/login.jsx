import React, { Component } from "react";
import logo from "../../imagens/LogInImg.jpg";
import { loginStyles } from "./loginStyles";
import "./login.css";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-10">
            <img src={logo} alt="#" />
          </div>
          <div className="col-md-2">
            <form style={loginStyles.formStyles}>
              <h4 className="hStyle">Log in</h4>
              <div className="form-group">
                <input
                  style={loginStyles.inputStyle}
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <input
                  style={loginStyles.inputStyle}
                  type="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                style={loginStyles.btnStyle}
                className="btn btn-primary btnStyle"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
