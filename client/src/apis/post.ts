import axiosInstance from "@/apis/axios";
import { PostScroll } from "@/types/post";

export const fetchPost = async (pageParam: number): Promise<PostScroll> => {
  const { data } = await axiosInstance.get(`/api/posts?lastId=${pageParam}`);
  console.log(data);
  return data;
};
