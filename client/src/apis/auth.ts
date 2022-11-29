import axiosInstance from "./axios";
import { AccessTokenInfo, MyInfo, PreSignedData } from "@/types/auth";
import axios from "axios";
import { API_SERVER_URL } from "@/constants/env";

export const githubLogInAPI = async (code: string): Promise<MyInfo> => {
  const { data } = await axiosInstance(`/auth/github?code=${code}`);
  return data;
};

export const tokenRefreshAPI = async (): Promise<AccessTokenInfo> => {
  const { data } = await axios.get(`${API_SERVER_URL}/auth/refresh`);
  return data;
};

export const logOutAPI = async (): Promise<void> => {
  await axiosInstance.delete("/auth/logout");
};

export const fetchPreSignedData = async (
  imageCount: number
): Promise<PreSignedData[]> => {
  const { data } = await axiosInstance.get(
    `${API_SERVER_URL}/auth/s3-url?imageCount=${imageCount}`
  );
  return data;
};
