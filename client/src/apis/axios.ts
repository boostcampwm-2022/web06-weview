import axios, { AxiosRequestConfig } from "axios";

import { API_SERVER_URL } from "@/constants/env";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_SERVER_URL,
  timeout: 10000,
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
