import axiosInstance from "@/apis/axios";
import { PostScroll } from "@/types/post";

export const fetchPost = async (
  lastId: number,
  size: number
): Promise<PostScroll> => {
  const { data } = await axiosInstance.get(
    `/api/posts?lastId=${lastId}&size=${size}`
  );
  return data;
};
