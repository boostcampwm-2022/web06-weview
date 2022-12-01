import axios, { AxiosRequestConfig } from "axios";

import { API_SERVER_URL } from "@/constants/env";

import {
  refreshErrorHandler,
  refreshInterceptor,
} from "./interceptors/refresh";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_SERVER_URL,
  timeout: 10000,
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(refreshInterceptor, refreshErrorHandler);

export default axiosInstance;
