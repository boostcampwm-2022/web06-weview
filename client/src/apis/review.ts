import axiosInstance from "./axios";
import { ReviewPages } from "@/types/review";

export const getReviewsAPI = async (
  postId: string,
  lastId: string
): Promise<ReviewPages> => {
  const { data } = await axiosInstance.get(
    `/posts/${postId}/reviews?lastId=${lastId}`
  );
  return data;
};
