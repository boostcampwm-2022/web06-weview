import axios, { AxiosRequestConfig } from "axios";
import {
  refreshErrorHandler,
  refreshInterceptor,
} from "./interceptors/refresh";

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  timeout: 10000,
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(refreshInterceptor, refreshErrorHandler);

export default axiosInstance;
