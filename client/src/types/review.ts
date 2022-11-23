import { UserInfo } from "@/types/auth";

export interface ReviewInfo {
  id: string;
  reviewer: reviewer;
  content: string;
  updatedAt: string;
}
export interface reviewer extends UserInfo {}

export interface ReviewScroll {
  reviews: ReviewInfo[];
  lastId: number;
  isLast: boolean;
}
