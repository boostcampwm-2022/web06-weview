import axiosInstance from "@/apis/axios";
import { PostPages, Writing, WritingResponse } from "@/types/post";
import { setQueryString } from "@/utils/queryString";
import useSearchStore from "@/store/useSearchStore";

export const fetchPost = async (pageParam: string): Promise<PostPages> => {
  const { searchQuery } = useSearchStore.getState();
  const { data } = await axiosInstance.get(
    `/posts?${setQueryString({ ...searchQuery, lastId: pageParam })}`
  );
  return data;
};

export const postWritingsAPI = async (
  writing: Writing
): Promise<WritingResponse> => {
  const { data } = await axiosInstance.post("/posts", writing);
  return data;
};
