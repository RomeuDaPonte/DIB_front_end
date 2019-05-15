import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";

const SidBar = () => {
  return (
    <div className="sidebar_menu">
      <center>
        <a href="#" />
        <h1 className="boxed_item">
          Felix <span className="logo_hold">Francisco</span>
        </h1>
        <h1 className="logo_title">data de hoje</h1>
      </center>
      <ul className="navigation_section">
        <li className="navigation_item">
          <a href>Orçamento</a>
        </li>
        <li className="navigation_item">
          <a href>Obra</a>
        </li>
        <li className="navigation_item">
          <a href>Cliente/Fornecedor</a>
        </li>
        <li className="navigation_item sem-border">
          <a href>Definições</a>
          <ul>
            <li className="navigation_item">
              <a className="sub-menu" />
              Novo utilizador
            </li>
            <li className="navigation_item">
              <a className="sub-menu">Lista de utilizadores</a>
            </li>
            <li className="navigation_item">
              <a className="sub-menu">Definir preços</a>
            </li>
          </ul>
        </li>
      </ul>
      <center>
        <a className="boxed_item boxed_item_smaller">
          <i className="fa fa-grav" style={{ color: "white" }} />
          <span style={{ color: "white" }}>Log out</span>
        </a>
      </center>
    </div>
  );
};

export default SidBar;
