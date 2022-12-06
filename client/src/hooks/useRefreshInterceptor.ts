import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";

import customLocalStorage from "@/utils/localStorage";
import axiosInstance from "@/apis/axios";
import { API_SERVER_URL } from "@/constants/env";
import useAuthStore from "@/store/useAuthStore";
import { logOutAPI } from "@/apis/auth";

export const useRefreshInterceptor = (): void => {
  const [resetMyInfoState] = useAuthStore((state) => [state.logout]);
  const refreshHandler = async (
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> => {
    const expiresIn = customLocalStorage.getItem("expiresIn");
    /* expiresIn이 없으면 로그인을 안 한 것이므로 refresh 요청을 하지 않는다. */
    if (expiresIn === null) return config;
    const commonAuthHeader =
      axiosInstance.defaults.headers.common.Authorization;
    /* Authorization 헤더와 expiresIn 값이 존재하고 expires 시간이 지나지 않았으면 refresh 요청을 하지 않는다. */
    if (commonAuthHeader !== undefined) {
      const nowDate = new Date();
      const expiresDate = new Date(Number(expiresIn));
      if (nowDate <= expiresDate) return config;
    }
    try {
      await refreshAndSetAccessTokenInHeader(config);
    } catch (e) {
      console.error(e);
    }
    return config;
  };

  const refreshAndSetAccessTokenInHeader = async (
    config: AxiosRequestConfig
  ): Promise<void> => {
    const {
      data: { accessToken, expiresIn: newExpiresIn },
    } = await axios.get(`${API_SERVER_URL}/auth/refresh`);
    if (config.headers !== undefined) {
      config.headers.Authorization = `Bearer ${String(accessToken)}`;
    }
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${String(
      accessToken
    )}`;
    customLocalStorage.setItem("expiresIn", String(newExpiresIn));
  };

  const refreshErrorHandler = (err: any): void => {
    if (err !== null) {
      (async () => {
        await logOutAPI();
        delete axiosInstance.defaults.headers.common.Authorization;
        resetMyInfoState();
      })().catch((err: any) => {
        console.error(err);
      });
    }
  };
  const refreshErrorInterceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        resetMyInfoState();
        customLocalStorage.removeItem("expiresIn");
        return Promise.reject(error);
      }
      return error;
    }
  );

  const refreshInterceptor = axiosInstance.interceptors.request.use(
    refreshHandler,
    refreshErrorHandler
  );
  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(refreshInterceptor);
      axios.interceptors.response.eject(refreshErrorInterceptor);
    };
  }, [refreshInterceptor, refreshErrorInterceptor]);
};
