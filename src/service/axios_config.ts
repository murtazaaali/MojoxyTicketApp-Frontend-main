import axios from "axios";
import useAuthStore from "../store/auth";
import { BACKEND_URL } from "../utilities/backend_config";

const instance = axios.create({
  baseURL: BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("mjx_ticket_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout();
    }
    return Promise.reject(error);
  },
);

export default instance;
