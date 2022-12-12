import { InfiniteScrollRequest } from "@/types/react-query";

export interface Label {
  type: LabelType;
  value: string;
}

export type LabelType = "tags" | "details" | "likes" | "reviews";

export interface SingleSearchFilter extends InfiniteScrollRequest {
  postId: string;
}

export interface SearchFilter extends InfiniteScrollRequest {
  details?: string[];
  tags?: string[];
  likeCount?: number;
  reviewCount?: number;
}

export interface BookmarkSearchFilter extends InfiniteScrollRequest {
  postId: string;
  userId: string;
}

export interface AuthorSearchFilter extends InfiniteScrollRequest {
  userId: string;
}

export type SearchType =
  | SearchFilter
  | BookmarkSearchFilter
  | AuthorSearchFilter
  | SingleSearchFilter;

export interface SearchHistory {
  tags: string[] | null;
  details: string[] | null;
  author: string | null;
  reviewCount: number | null;
  likeCount: number | null;
  updatedAt: string;
  id: string;
}
