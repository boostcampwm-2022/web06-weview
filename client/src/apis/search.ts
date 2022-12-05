import axiosInstance from "@/apis/axios";
import { SearchHistory } from "@/types/search";
import { MAX_SEARCH_HISTORY } from "@/constants/search";

/**
 * 사용자의 최근 검색어를 요청하는 함수
 */
export const fetchSearchHistory = async (): Promise<SearchHistory[]> => {
  const { data } = await axiosInstance.get(`/search/histories`);
  if (!Array.isArray(data)) {
    console.log("hi", data);
    return [];
  }
  if (data.length > MAX_SEARCH_HISTORY) {
    console.log(data.length);
    return data.slice(0, 5);
  }
  return data;
};

export const deleteSearchHistory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/search/histories/${id}`);
};
