import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/orcamento";

export async function novo(orcamento) {
  return await http.post(apiEndPoint, {
    clienteId: orcamento.clienteId,
    descritivo: orcamento.descritivo,
    tecnicoResponsavel: orcamento.tecnicoResponsavel,
    elaboradoPorId: orcamento.elaboradoPorId
  });
}
