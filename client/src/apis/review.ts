import { ReviewResponse, ReviewPages } from "@/types/review";

import axiosInstance from "./axios";

export const getReviewsAPI = async (
  postId: string,
  lastId: string
): Promise<ReviewPages> => {
  const { data } = await axiosInstance.get(
    `/posts/${postId}/reviews?lastId=${lastId}`
  );
  return data;
};

export const postReviewAPI = async (
  postId: string,
  content: string
): Promise<ReviewResponse> => {
  const { data } = await axiosInstance.post(`/reviews`, { postId, content });
  return data;
};
