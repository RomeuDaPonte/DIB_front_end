import React, { Component } from "react";
import EditUserModal from "../account/editUserModal";

class TabelaDeUsers extends Component {
  handleUpdateUser = (data, userId) => {
    const user = {
      _id: userId,
      role: data.role
    };

    this.props.callUpdateUser(user);
  };

  render() {
    const { listaDeUsers } = this.props;

    return (
      <div className="card m-2">
        <h4 className="card-header bg-info text-white bg-dark">
          Lista de utilizadores
        </h4>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Noma</th>
                <th>Email</th>
                <th>Função</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {listaDeUsers &&
                listaDeUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <EditUserModal
                        updateUser={this.handleUpdateUser}
                        user={user}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TabelaDeUsers;
