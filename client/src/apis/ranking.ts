import { RankingData } from "@/types/ranking";
import axiosInstance from "@/apis/axios";

export const getRankingAPI = async (): Promise<RankingData[]> => {
  const { data } = await axiosInstance.get("/ranking/tags");
  return data;
};
