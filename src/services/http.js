import axios from "axios";
import { apiUrl } from "../config.json";
import { refresh } from "../utils/refresh";
import { useHistory } from "react-router-dom";
import auth from "./authService";

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add a response interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
