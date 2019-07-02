import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPont = apiUrl + "/account";
const tokenKey = "token";

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function newUser(user) {
  return await http.post(apiEndPont + "/new", {
    name: user.username,
    email: user.email,
    password: user.password,
    passwordConfirmation: user.passwordConfirmation,
    role: user.funcao
  });
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPont + "/login", {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function getRoles() {
  return await http.get(apiEndPont + "/roles");
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  newUser,
  getRoles
};
