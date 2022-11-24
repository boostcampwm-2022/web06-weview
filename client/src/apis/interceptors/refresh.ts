import { AxiosRequestConfig } from "axios";
import { logOutAPI, tokenRefreshAPI } from "../auth";
import customLocalStorage from "@/utils/localStorage";
import axiosInstance from "@/apis/axios";
import { isEmpty } from "@/utils/typeCheck";
import useAuthStore from "@/store/useAuthStore";

export const refreshInterceptor = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const expiresIn = customLocalStorage.getItem("expiresIn");
  if (expiresIn === null) return config;
  if (isEmpty(axiosInstance.defaults.headers.common.Authorization)) {
    await refreshAndSetAccessTokenInHeader(config);
    return config;
  }
  const nowDate = new Date();
  const expiresDate = new Date(Number(expiresIn));
  if (nowDate <= expiresDate) return config;
  await refreshAndSetAccessTokenInHeader(config);
  return config;
};

export const refreshErrorHandler = (err: any): void => {
  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));
  if (err !== null) {
    (async () => {
      await logOutAPI();
      delete axiosInstance.defaults.headers.common.Authorization;
      logout();
    })().catch((err: any) => {
      console.error(err);
    });
    alert("로그인이 만료되셨습니다. 다시 로그인 부탁드립니다.");
  }
};

export const refreshAndSetAccessTokenInHeader = async (
  config: AxiosRequestConfig
): Promise<void> => {
  const { accessToken, expiresIn: newExpiresIn } = await tokenRefreshAPI();
  if (config.headers !== undefined) {
    config.headers.Authorization = `Bearer ${String(accessToken)}`;
  }
  customLocalStorage.setItem("expiresIn", String(newExpiresIn));
};
