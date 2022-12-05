import { UserInfo } from "@/types/auth";
import { InfiniteScrollResponse } from "@/types/react-query";

export interface ReviewerInfo extends UserInfo {}

export interface ReviewInfo {
  id: string;
  reviewer: ReviewerInfo;
  content: string;
  updatedAt: string;
}

export interface ReviewPages extends InfiniteScrollResponse {
  reviews: ReviewInfo[];
}

export interface ReviewResponse {
  message: string;
}
