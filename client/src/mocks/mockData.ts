import { UserInfo } from "@/types/auth";
import { Post } from "@/types/post";

export const mockUser: UserInfo = {
  id: 1,
  username: "test",
  accessToken: "1234",
  expiresIn: "1234555",
  email: "name@gmail.com",
  avatar_url: "http://placeimg.com/640/640/animals",
};

export const mockPost: Post = {
  contents: "샘플 포스트 내용",
  id: "10",
  imageUrls: [
    "http://placeimg.com/640/640/animals",
    "http://placeimg.com/640/640/animals",
  ],
  reviews: [],
  tags: ["tag1", "tag2"],
  title: "샘플 포스트 제목",
  user: {
    id: "10000",
    username: "sampleUser",
    profileUrl: "http://placeimg.com/640/640/animals",
    email: "name@gmail.com",
  },
};
