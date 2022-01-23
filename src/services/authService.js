import http from "./http";
import jwtDecode from "jwt-decode";
import { refresh } from "../utils/refresh";

const apiEndpoint = "/login";
const tokenKey = "x-auth-token";

http.setJwt(getJwt());

const login = async ({ username, password }) => {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwtDecode(jwt).exp < Date.now() / 1000) {
      localStorage.removeItem("x-auth-token");
      refresh("/");
    }

    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
};

function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
