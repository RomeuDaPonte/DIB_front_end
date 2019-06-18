import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Logotipo from "../../imagens/MenuLogo.jpg";
import "./sidebar.css";

const SidBar = ({ user }) => {
  return (
    <div className="sidebar_menu">
      <img className="logitipoMenu" src={Logotipo} alt="#" />
      <center>
        <h1 className="boxed_item">
          <span className="logo_bold">{user && user.name}</span>{" "}
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
          <NavLink to="">Definições</NavLink>
          <ul>
            <li className="navigation_item">
              <NavLink className="sub-menu" to="">
                Novo utilizador
              </NavLink>
            </li>
            <li className="navigation_item">
              <NavLink className="sub-menu" to="">
                Lista de utilizadores
              </NavLink>
            </li>
            <li className="navigation_item">
              <NavLink className="sub-menu" to="">
                Definir preços
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
      <center>
        <NavLink className="boxed_item boxed_item_smaller" to="">
          <i className="fa fa-grav mr-2" style={{ color: "white" }} />
          <span style={{ color: "white" }}>Log out</span>
        </NavLink>
      </center>
    </div>
  );
};

export default SidBar;
