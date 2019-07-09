import React, { Component } from "react";
import { toast } from "react-toastify";
import RegisterModal from "../account/registerModal";
import PrecosFormModal from "./precosFormModal";
import TabelaDePrecos from "./tabelaDePrecos";
import { getAllUsers } from "../../services/accountService";
import TabelaDeUsers from "./tabelaDeUsers";

class Definicoes extends Component {
  state = {
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

  async componentDidMount() {
    const { data: users } = await getAllUsers();
    this.setState({ users });
  }

  renderPrecos = precos => {
    this.setState({ data: precos });
  };

  addNovoUser = user => {
    let users = this.state.users;
    users.push(user);

    this.setState({ users });
  };

  doUpdateUser = user => {
    let listaDeUsers = this.state.users;
    let userAEditar = listaDeUsers.find(userElement => {
      return userElement._id === user._id;
    });
    listaDeUsers[listaDeUsers.indexOf(userAEditar)].role = user.role;

    this.setState({ users: listaDeUsers });
    toast.success("Edição bem sucedida!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  render() {
    const { data: precos } = this.state;

    return (
      <React.Fragment>
        <div className="headerStyles">
          <div className="container">
            <div className="row justify-content-center">
              <div className="headerIcon col-2 mt-3">
                <RegisterModal novoUser={this.addNovoUser} />
              </div>
              <div className="headerIcon col-2 mt-3">
                <PrecosFormModal showPrecos={this.renderPrecos} />
              </div>
            </div>
          </div>
        </div>
        {this.state.data && (
          <TabelaDePrecos
            automacao={precos.automacao}
            consultoria={precos.consultoria}
            desenvolvimento={precos.desenvolvimento}
            maquinacao={precos.maquinacao}
            margem={precos.margem}
            montagem={precos.montagem}
          />
        )}

        <TabelaDeUsers
          callUpdateUser={this.doUpdateUser}
          listaDeUsers={this.state.users}
        />
      </React.Fragment>
    );
  }
}

export default Definicoes;
