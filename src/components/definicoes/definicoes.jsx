import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import RegisterModal from "../account/registerModal";
import PrecosFormModal from "./precosFormModal";
import TabelaDePrecos from "./tabelaDePrecos";
import { getAllUsers } from "../../services/accountService";
import * as precos from "../../services/precosService";
import TabelaDeUsers from "./tabelaDeUsers";

const Definicoes = () => {
  const state = {
    data: {
      automacao: "",
      consultoria: "",
      desenvolvimento: "",
      maquinacao: "",
      margem: "",
      montagem: ""
    },
    users: []
  };

  const [currentState, setState] = useState(state);

  useEffect(() => {
    (async function() {
      const { data: users } = await getAllUsers();
      const { data: preco } = await precos.getPrecos();
      setState({
        data: preco,
        users
      });
    })();
  }, []);

  function updatePrecos(novosPrecos) {
    setState({
      ...currentState,
      data: novosPrecos
    });

    toast.success("Alteração de preços bem sucedida!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  function addNovoUser(user) {
    let users = currentState.users;
    users.push(user);

    setState({
      ...currentState,
      users
    });

    toast.success("Utilizador adicionado com sucesso!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  function doUpdateUser(user) {
    let listaDeUsers = currentState.users;
    let userAEditar = listaDeUsers.find(userElement => {
      return userElement._id === user._id;
    });
    listaDeUsers[listaDeUsers.indexOf(userAEditar)].role = user.role;

    setState({
      ...currentState,
      users: listaDeUsers
    });
    toast.success("Edição bem sucedida!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  return (
    <React.Fragment>
      <div className="headerStyles">
        <div className="container">
          <div className="row justify-content-center">
            <div className="headerIcon col-2 mt-3">
              <RegisterModal novoUser={addNovoUser} />
            </div>
            <div className="headerIcon col-2 mt-3">
              <PrecosFormModal
                precos={currentState.data}
                updatePrecos={updatePrecos}
              />
            </div>
          </div>
        </div>
      </div>
      {currentState.data && (
        <TabelaDePrecos
          automacao={currentState.data.automacao}
          consultoria={currentState.data.consultoria}
          desenvolvimento={currentState.data.desenvolvimento}
          maquinacao={currentState.data.maquinacao}
          margem={currentState.data.margem}
          montagem={currentState.data.montagem}
        />
      )}

      <TabelaDeUsers
        callUpdateUser={doUpdateUser}
        listaDeUsers={currentState.users}
      />
    </React.Fragment>
  );
};

export default Definicoes;
