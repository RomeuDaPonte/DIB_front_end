import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/entidade";

export async function novaEntidade(entidade) {
  return await http.post(apiEndPoint, {
    name: entidade.name,
    tipo: entidade.tipo,
    nif: entidade.nif,
    morada: entidade.morada,
    codigoPostal: entidade.codigoPostal,
    localidade: entidade.localidade,
    condicoesDePagamento: entidade.condicoesDePagamento
  });
}

export async function editar(entidade) {
  return await http.put(apiEndPoint + "/" + entidade._id, {
    name: entidade.name,
    tipo: entidade.tipo,
    nif: entidade.nif,
    morada: entidade.morada,
    codigoPostal: entidade.codigoPostal,
    localidade: entidade.localidade,
    condicoesDePagamento: entidade.condicoesDePagamento
  });
}

export async function pesquisar(dadosDaPesquisa) {
  return await http.post(apiEndPoint + "/search", {
    name: dadosDaPesquisa.name,
    nif: dadosDaPesquisa.nif,
    localidade: dadosDaPesquisa.localidade,
    morada: dadosDaPesquisa.morada,
    codigoPostal: dadosDaPesquisa.codigoPostal
  });
}

export async function getCondicoesDePagamento() {
  return await http.get(apiEndPoint + "/condicoesdepagamento");
}

export async function getTiposDeEntidade() {
  return await http.get(apiEndPoint + "/gettipos");
}

export async function getAllEntidades() {
  return await http.get(apiEndPoint + "/getall");
}

export async function getSingleEntidade(entidadeId) {
  return await http.get(apiEndPoint + "/" + entidadeId);
}

export default {
  novaEntidade
};
