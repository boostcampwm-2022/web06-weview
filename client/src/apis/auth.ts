import axiosInstance from "./axios";
import { AccessTokenInfo, UserInfo } from "../types/auth";

export const githubLogInAPI = async (code: string): Promise<UserInfo> => {
  const { data } = await axiosInstance.get(`/auth?code=${code}`);
  return data;
};

export const tokenRefreshAPI = async (): Promise<AccessTokenInfo> => {
  const { data } = await axiosInstance.get("/auth/refresh");
  return data;
};

export const logOutAPI = async (): Promise<void> => {
  await axiosInstance.delete("/auth/logout");
};
