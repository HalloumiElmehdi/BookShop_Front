import http from "./http";
import jwtDecode from "jwt-decode";
import { refresh } from "../utils/refresh";

const apiEndpoint = "/login";
const tokenKey = "Authorization";

http.setJwt(getJwt());

const login = async ({ username, password }) => {
  console.log(username + "  " + password);
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt.token);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwtDecode(jwt).exp < Date.now() / 1000) {
      localStorage.removeItem("Authorization");
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
