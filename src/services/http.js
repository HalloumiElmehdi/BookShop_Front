import axios from "axios";
import { apiUrl } from "../config.json";
import { refresh } from "../utils/refresh";

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = "";

// Add a response interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // refresh("/network-error");
    console.log(error);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  // axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
