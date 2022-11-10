import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
