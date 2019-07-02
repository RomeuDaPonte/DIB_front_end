import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPont = apiUrl + "/precos";

export async function getPrecos() {
  return await http.get(apiEndPont + "/");
}

export async function setPrecos(precos) {
  return await http.post(apiEndPont + "/", {
    automacao: precos.automacao,
    consultoria: precos.consultoria,
    desenvolvimento: precos.desenvolvimento,
    maquinacao: precos.maquinacao,
    margem: precos.margem,
    montagem: precos.montagem
  });
}

export default {
  getPrecos,
  setPrecos
};
