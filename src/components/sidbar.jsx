import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Logotipo from "../imagens/MenuLogo.jpg";
import "../estilos/sidebar.css";

class SideBar extends Component {
  state = {
    naoMostra: "nao-mostra"
  };

  toogleClass = e => {
    let hasClass = this.state.naoMostra;

    if (hasClass) {
      hasClass = "";
      this.setState({ naoMostra: hasClass });
    } else {
      hasClass = "nao-mostra";
      this.setState({ naoMostra: hasClass });
    }
  };

  render() {
    const user = this.props.user;

    return (
      <div className="sidebar_menu">
        <img className="logitipoMenu" src={Logotipo} alt="#" />
        <center>
          <h1 className="boxed_item">
            <span className="logo_bold">{user && user.name}</span>
          </h1>
          <h1 className="logo_title mt-2">
            {moment().format("dddd, MMMM Do YYYY")}
          </h1>
        </center>
        <ul className="navigation_section">
          <li className="navigation_item">
            <NavLink to="">Orçamento</NavLink>
          </li>
          <li className="navigation_item">
            <NavLink to="">Obra</NavLink>
          </li>
          <li className="navigation_item">
            <NavLink to="">Cliente/Fornecedor</NavLink>
          </li>
          <li className="navigation_item sem-border">
            <button className="btn-defenicoes" onClick={this.toogleClass}>
              Definicoes
            </button>
            <ul className={this.state.naoMostra} id="subMenuAdmin">
              <li className="navigation_item">
                <NavLink className="sub-menu" to="/register">
                  Novo utilizador
                </NavLink>
              </li>
              <li className="navigation_item">
                <NavLink className="sub-menu" to="">
                  Lista de utilizadores
                </NavLink>
              </li>
              <li className="navigation_item sem-border">
                <NavLink className="sub-menu" to="">
                  Definir preços
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <center>
          <NavLink className="boxed_item boxed_item_smaller mt-3" to="">
            <i className="fa fa-power-off fa-2x" style={{ color: "white" }} />
          </NavLink>
        </center>
      </div>
    );
  }
}

export default SideBar;
