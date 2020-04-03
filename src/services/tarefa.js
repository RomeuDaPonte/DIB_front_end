import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/tarefa";

export async function nova(orcamentoId, tarefa) {
  return await http.post(apiEndPoint + `/${orcamentoId}`, tarefa);
}

export async function getAllForOrcamento(orcamentoId) {
  return await http.get(apiEndPoint + `/getallfororcamento/${orcamentoId}`);
}

export async function deleteTarefa(tarefa) {
  return await http.delete(
    apiEndPoint + `/${tarefa.orcamentoId}&${tarefa._id}`
  );
}
