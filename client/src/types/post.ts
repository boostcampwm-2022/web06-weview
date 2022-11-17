// GET /api/post API 명세를 보고 만든 타입
export interface User {
  id: string;
  username: string;
  profileUrl: string;
  email: string;
}

export interface Review {
  id: string;
  user: User;
  contents: string;
}

export interface PostInfo {
  id: string;
  title: string;
  content: string;
  imageUrls: string[];
  user: User;
  tags: string[];
  reviews: Review[];
  updatedAt: string;
  code: string;
}

export interface PostScroll {
  posts: PostInfo[];
  lastId: number;
  isLast: boolean;
}

export interface WritingResponse {
  message: string;
}

export interface Writing {
  title: string;
  content: string;
  code: string;
  language: string;
  images: string[];
  tags?: string[];
}
