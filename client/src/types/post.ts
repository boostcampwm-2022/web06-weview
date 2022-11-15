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
  contents: string;
  imageUrls: string[];
  user: User;
  tags: string[];
  reviews: Review[];
}

export interface PostScroll {
  posts: PostInfo[];
  lastId: number;
  isLast: boolean;
}
