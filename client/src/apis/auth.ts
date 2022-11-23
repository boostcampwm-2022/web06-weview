import axiosInstance from "./axios";
import { AccessTokenInfo, MyInfo } from "@/types/auth";

export const githubLogInAPI = async (code: string): Promise<MyInfo> => {
  const { data } = await axiosInstance(`/auth/github?code=${code}`);
  return data;
};

export const tokenRefreshAPI = async (): Promise<AccessTokenInfo> => {
  const { data } = await axiosInstance.get("/auth/refresh");
  return data;
};

export const logOutAPI = async (): Promise<void> => {
  await axiosInstance.delete("/auth/logout");
};
