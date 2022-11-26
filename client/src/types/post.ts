// GET /api/post API 명세를 보고 만든 타입
import { UserInfo } from "@/types/auth";

export interface Image {
  src: string;
  name: string;
}

interface AdditionalPostInfo {
  category?: string;
  likes?: number;
}

export interface CodeStore {
  code: string;
  language: string;
  setCode?: (code: string) => void;
}

export interface CodeInfo extends CodeStore {
  isEditable: boolean;
}

export interface PostInfo extends AdditionalPostInfo {
  id: string;
  title: string;
  content: string;
  code: string;
  language: string;
  images: Image[];
  updatedAt: string;
  author: UserInfo;
  tags: string[];
}

export interface PostPages {
  posts: PostInfo[];
  lastId: number;
  isLast: boolean;
}

export interface WritingResponse {
  message: string;
}

export interface WritingRequest {
  title: string;
  category: string;
  content: string;
  code: string;
  language: string;
  images: string[];
  tags?: string[];
  lineCount: number;
}
