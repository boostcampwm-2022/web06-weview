import { AxiosRequestConfig } from "axios";
import { logOutAPI, tokenRefreshAPI } from "../auth";
import customLocalStorage from "@/utils/localStorage";

export const refreshInterceptor = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const expiresIn = customLocalStorage.getItem("expiresIn");
  if (expiresIn === null) return config;

  const nowDate = new Date();
  const expiresDate = new Date(expiresIn);
  if (nowDate <= expiresDate) return config;

  const { accessToken, expiresIn: newExpiresIn } = await tokenRefreshAPI();
  if (config.headers !== undefined) {
    config.headers.Authorization = `Bearer ${String(accessToken)}`;
  }
  customLocalStorage.setItem("expiresIn", newExpiresIn);
  return config;
};

export function refreshErrorHandler(err: any): void {
  if (err !== null) {
    (async () => {
      await logOutAPI();
    })().catch((err: any) => {
      console.error(err);
    });
    alert("로그인이 만료돼셨습니다. 다시 로그인 부탁드립니다.");
  }
}
