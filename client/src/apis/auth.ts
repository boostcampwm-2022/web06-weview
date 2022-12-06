import { MyInfo, PreSignedData } from "@/types/auth";
import { API_SERVER_URL } from "@/constants/env";

import axiosInstance from "./axios";

export const githubLogInAPI = async (code: string): Promise<MyInfo> => {
  const { data } = await axiosInstance(`/auth/github?code=${code}`);
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
