import React from "react";

const TabelaDeUser = props => {
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
            {props.listaDeUsers &&
              props.listaDeUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>btns</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaDeUser;
