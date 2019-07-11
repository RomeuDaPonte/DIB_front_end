import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/entidade";

export async function getCondicoesDePagamento() {
  return await http.get(apiEndPoint + "/condicoesdepagamento");
}

export async function getTiposDeEntidade() {
  return await http.get(apiEndPoint + "/gettipos");
}

export default {
  getCondicoesDePagamento,
  getTiposDeEntidade
};
