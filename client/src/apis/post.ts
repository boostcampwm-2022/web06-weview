import axiosInstance from "@/apis/axios";
import { PostScroll, Writing, WritingResponse } from "@/types/post";

export const fetchPost = async (
  lastId: number,
  size: number
): Promise<PostScroll> => {
  const { data } = await axiosInstance.get(
    `/api/posts?lastId=${lastId}&size=${size}`
  );
  return data;
};

export const postWritingsAPI = async (
  writing: Writing
): Promise<WritingResponse> => {
  const { data } = await axiosInstance.post("api/posts", writing);
  return data;
};
