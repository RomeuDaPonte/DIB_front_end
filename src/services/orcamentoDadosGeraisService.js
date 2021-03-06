import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/orcamentodadosGerais";

export async function novo(orcamento) {
  return await http.post(apiEndPoint, {
    clienteId: orcamento.clienteId,
    descritivo: orcamento.descritivo,
    tecnicoResponsavel: orcamento.tecnicoResponsavel,
    elaboradoPorId: orcamento.elaboradoPorId
  });
}

export async function getAll() {
  return await http.get(apiEndPoint + "/getall");
}

export async function editar(orcamentoId, orcamentoAEditar) {
  return await http.put(apiEndPoint + "/" + orcamentoId, orcamentoAEditar);
}

export async function get(orcamentoId) {
  return await http.get(apiEndPoint + "/" + orcamentoId);
}
