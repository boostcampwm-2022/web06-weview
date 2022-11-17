import axiosInstance from "@/apis/axios";
import { PostScroll, Writing, WritingResponse } from "@/types/post";

export const fetchPost = async (lastId: number): Promise<PostScroll> => {
  const { data } = await axiosInstance.get(`/posts?lastId=${lastId}`);
  return data;
};

export const postWritingsAPI = async (
  writing: Writing
): Promise<WritingResponse> => {
  const { data } = await axiosInstance.post("/posts", writing);
  return data;
};
