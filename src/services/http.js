import axios from "axios";
import { apiUrl } from "../config.json";

axios.defaults.baseURL = apiUrl;

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";

// Add a response interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("error network");
    //window.location = "/";
  }
  return Promise.reject(error);
});

console.log("api URL : ", apiUrl);

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
};

export default http;
