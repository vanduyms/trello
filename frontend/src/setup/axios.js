import axios from "axios";
import { toast } from "react-toastify";
import { API_ROOT } from "~/utils/constants";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_ROOT,
})

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const originalRequest = error.config;

  // If the error status is 401 and there is no originalRequest._retry flag,
  // it means the token has expired and we need to refresh it
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const response = await axios.post(`${API_ROOT}/v1/refresh_token`);
      const { access_token } = response.data;

      localStorage.setItem('userToken', access_token);

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return axios(originalRequest);
    } catch (error) {
    }
  }

  else {
    toast.error(`${error.response.data.message}`);
  }
  return Promise.reject(error);
})

export default instance;