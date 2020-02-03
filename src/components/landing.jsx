import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Sidbar from "./sidbar";
import accountService from "../services/accountService";
import Definicoes from "./definicoes/definicoes";
import Entidade from "./entidade/entidade";
import ListaDeOrcamentos from "./orcamento/listaDeOrcamentos";

const Landing = () => {
  const state = {
    user: null
  };

  const [currentState, setState] = useState(state);

  useEffect(() => {
    const user = accountService.getCurrentUser();
    setState({ user });
  }, []);

  return (
    <div className="container-fluid p-0">
      <Sidbar user={currentState.user} />
      <div className="contentorPrincipal">
        <Switch>
          <Route path="/definicoes" component={Definicoes} />
          <Route path="/entidade" component={Entidade} />
          <Route path="/listaDeOrcamentos" component={ListaDeOrcamentos} />
        </Switch>
      </div>
    </div>
  );
};

export default Landing;
