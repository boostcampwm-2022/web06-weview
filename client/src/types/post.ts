// GET /api/post API 명세를 보고 만든 타입
import { PreSignedData, UserInfo } from "@/types/auth";
import { InfiniteScrollResponse } from "@/types/react-query";

export interface Image {
  src: string;
  name: string;
}

export interface UploadImageProps {
  preSignedData: PreSignedData;
  imageUri: string;
}

export interface PostInfo {
  id: string;
  title: string;
  content: string;
  code: string;
  language: string;
  tags: string[];
  images: Image[];
  author: UserInfo;
  updatedAt: string;
  reviewCount: number;
  likeCount: number;
  lineCount: number;
  isLiked?: boolean;
}

export interface PostPages extends InfiniteScrollResponse {
  posts: PostInfo[];
}

export interface WritingResponse {
  message: string;
}
