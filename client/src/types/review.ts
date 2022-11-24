import { UserInfo } from "@/types/auth";

export interface ReviewInfo {
  id: string;
  reviewer: Reviewer;
  content: string;
  updatedAt: string;
}
export interface Reviewer extends UserInfo {}

export interface ReviewPages {
  reviews: ReviewInfo[];
  lastId: number;
  isLast: boolean;
}
