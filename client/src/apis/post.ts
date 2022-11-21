import axiosInstance from "@/apis/axios";
import {
  PostScroll,
  SearchQuery,
  Writing,
  WritingResponse,
} from "@/types/post";
import { setQueryString } from "@/utils/queryString";

export const fetchPost = async (
  searchQuery: SearchQuery
): Promise<PostScroll> => {
  const { data } = await axiosInstance.get(
    `/posts?${setQueryString(searchQuery)}`
  );
  return data;
};

export const postWritingsAPI = async (
  writing: Writing
): Promise<WritingResponse> => {
  const { data } = await axiosInstance.post("/posts", writing);
  return data;
};
