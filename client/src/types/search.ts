import { InfiniteScrollRequest } from "@/types/react-query";

export interface Label {
  type: string;
  value: string;
}

export interface SearchFilter extends InfiniteScrollRequest {
  details?: string[];
  tags?: string[];
  likeCount?: number;
  reviewCount?: number;
}

export interface BookmarkSearchFilter extends InfiniteScrollRequest {
  postId: string;
}

export interface AuthorSearchFilter extends InfiniteScrollRequest {
  userId: string;
}
