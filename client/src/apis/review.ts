import axiosInstance from "./axios";
import { ReviewScroll } from "@/types/review";

export const getReviewsAPI = async (
  postId: string,
  lastId: string
): Promise<ReviewScroll> => {
  const { data } = await axiosInstance.get(
    `/posts/${postId}?lastId=${lastId})}`
  );
  return data;
};
