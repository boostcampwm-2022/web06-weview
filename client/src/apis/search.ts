import axiosInstance from "@/apis/axios";
import { SearchHistory } from "@/types/search";

/**
 * 사용자의 최근 검색어를 요청하는 함수
 */
export const fetchSearchHistory = async (): Promise<SearchHistory[]> => {
  const { data } = await axiosInstance.get(`/search/histories`);
  return data;
};
