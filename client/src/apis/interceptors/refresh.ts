import { AxiosRequestConfig } from "axios";
import axiosInstance from "../axios";

export const refreshInterceptor = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const expiresIn = localStorage.getItem("expiresIn");
  if (expiresIn === null) return config;

  const nowDate = new Date();
  const expiresDate = new Date(expiresIn);
  if (nowDate <= expiresDate) return config;

  const { data } = await axiosInstance.post(`/auth/refresh`);
  return config;
};

export function refreshErrorHandler(err: any): void {
  if (err !== null) {
    (async () => {
      await logOutAPI();
    })().catch((err: any) => {
      console.error(err);
      ㄹ;
    });
    alert("로그인이 만료돼셨습니다. 다시 로그인 부탁드립니다.");
  }
}
