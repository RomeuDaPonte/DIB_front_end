import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EntidadeModal from "./entidadeModal";
import * as entidade from "../../services/entidadeService";
import TabelaDeEntidades from "./tabelaDeEntidades";
import PesquisaEntidadeModal from "./pesquisaEntidadeModal";

const Entidade = () => {
  const state = {
    entidades: []
  };

  const [currentState, setEntidades] = useState(state);

  useEffect(() => {
    (async function() {
      const { data: entidades } = await entidade.getAllEntidades();
      setEntidades({ entidades });
    })();
  }, []);

  function updateListaDeEntidades(novaEntidade) {
    const listaDeEntidades = currentState.entidades;
    let entidadeAEditar = listaDeEntidades.find(entida => {
      return entida._id === novaEntidade._id;
    });

    if (entidadeAEditar) updateSingleEntidade(entidadeAEditar, novaEntidade);
    else addNovaEntidade(novaEntidade);

    toast.success("Alterações efectuadas com sucesso!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  function mostraResultadosDaPesquisa(resultadosDaPesquisa) {
    setEntidades({ entidades: resultadosDaPesquisa });
  }

  function updateSingleEntidade(entidadeAEditar, novaEntidade) {
    const listaDeEntidades = currentState.entidades;
    listaDeEntidades[listaDeEntidades.indexOf(entidadeAEditar)] = novaEntidade;

    setEntidades({ entidades: listaDeEntidades });
  }

  function addNovaEntidade(novaEntidade) {
    const listaDeEntidades = currentState.entidades;
    listaDeEntidades.push(novaEntidade);
    setEntidades({ entidades: listaDeEntidades });
  }

  return (
    <React.Fragment>
      <div className="headerStyles">
        <div className="container">
          <div className="row justify-content-center">
            <div className="headerIcon col-2 mt-3">
              <EntidadeModal updateListaDeEntidades={updateListaDeEntidades} />
            </div>
            <div className="headerIcon col-2 mt-3">
              <PesquisaEntidadeModal pesquisar={mostraResultadosDaPesquisa} />
            </div>
          </div>
        </div>
      </div>
      <TabelaDeEntidades
        listaDeEntidades={currentState.entidades}
        updateListaDeEntidades={updateListaDeEntidades}
      />
    </React.Fragment>
  );
};

export default Entidade;
