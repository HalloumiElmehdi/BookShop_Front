import axios from "axios";
import { apiUrl } from "../config.json";
import { refresh } from "../utils/refresh";
import { setToast } from "../utils/toasts";

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

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default http;
