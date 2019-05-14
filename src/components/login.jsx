import React, { Component } from "react";
import logo from "../imagens/LogInImg.jpg";

class Login extends Component {
  imputStye = {
    border: "1px solid black",
    backgroundColor: "#212020"
  };
  formStyles = {
    margin: 0,
    padding: 10,
    backgroundColor: "black",
    height: "100%"
  };
  btnStyle = {
    width: "100%",
    margin: 0
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-10">
            <img style={this.imgStyle} src={logo} />
          </div>
          <div className="col-md-2">
            <form style={this.formStyles}>
              <h4 style={{ color: "white" }}>Log in</h4>
              <div className="form-group">
                <input
                  style={this.imputStye}
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <input
                  style={this.imputStye}
                  type="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                />
              </div>
              <button
                style={this.btnStyle}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
