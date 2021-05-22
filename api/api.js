import axios from "axios";
import { isAuthenticated } from "../components/Shared/Routes/permissionChecker";

const api = axios.create({
  baseURL: "http://192.168.133.1:5000/api",
});

api.interceptors.request.use(
  async (config) => {
    if (await isAuthenticated()) {
      config.headers["Authorization"] = "Bearer " + await isAuthenticated();
      config.headers["x-access-token"] = await isAuthenticated();
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default api;
