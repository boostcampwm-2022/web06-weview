import { PostInfo } from "@/types/post";
import { SearchHistory } from "@/types/search";
import { ReviewInfo } from "@/types/review";
import { MyInfo } from "@/types/auth";
import { LARGE_CONTENT, SMALL_CONTENT } from "@/mocks/datasource/mockConstants";

export const mockUser: MyInfo = {
  id: "1",
  nickname: "test",
  accessToken: "1234",
  expiresIn: 1669293441000,
  email: "name@gmail.com",
  profileUrl: "http://placeimg.com/640/640/animals",
};

export let posts: PostInfo[];
posts = Array.from(Array(1024).keys()).map((id) => ({
  id: `${id}`,
  title: `제목_${id}`,
  content: id % 2 === 0 ? LARGE_CONTENT : SMALL_CONTENT,
  images: [
    {
      src: "http://placeimg.com/640/640/animals",
      name: "image1",
    },
    {
      src: "http://placeimg.com/640/640/people",
      name: "image1",
    },
  ],
  author: {
    id: `${id % 100}`,
    nickname: `sampleUser_${id + 10000}`,
    profileUrl: "http://placeimg.com/640/640/animals",
    email: `name_${id + 10000}@gmail.com`,
  },
  tags: [
    "#javascript",
    "#js",
    "es6",
    "typescript",
    "python",
    "helloworld",
    "안녕하세요",
  ],
  reviewCount: id % 10,
  likeCount: id % 10,
  lineCount: 1,
  updatedAt: "2022-11-16 12:26:56.124939",
  code: `sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~sourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\nsourcecode: ~~~~~~~~~~~~~~~~~~\n`,
  language: `javascript`,
  isLiked: false,
}));

export const setPosts = (newPosts: PostInfo[]): void => {
  posts = newPosts;
};

export const reviews: ReviewInfo[] = Array.from(Array(1024).keys()).map(
  (id) => ({
    id: String(id),
    reviewer: {
      id: String(Math.floor(Math.random() * 3000)),
      nickname: String(Math.floor(Math.random() * 3000)) + "author",
      profileUrl: "https://avatars.githubusercontent.com/u/55542546?v=4",
      email: String(Math.floor(Math.random() * 3000)) + "@naver.com",
    },
    content: "LGTM~乃~乃~乃\n고생하셨습니다.",
    updatedAt: "2022-11-14 16:42:56.124939",
  })
);

export const rankingData = [
  { name: "javascript", prev: 2 },
  { name: "java", prev: 3 },
  { name: "sort", prev: 0 },
  { name: "algorithm", prev: 12 },
  { name: "coding-testzxcvzxvxzcvzxvzxc", prev: 5 },
  { name: "quick-sort", prev: 6 },
  { name: "sort-array", prev: 9 },
  { name: "promise", prev: 8 },
  { name: "layout", prev: 7 },
  { name: "kotlin", prev: 13 },
];

export let history: SearchHistory[];
history = [];

// lint: import 한 변수에 직접 할당 불가 오류 해결을 위한 함수
export const setHistory = (newHistory: SearchHistory[]): void => {
  history = newHistory;
};

export let bookmarks: number[];
bookmarks = [];

export const setBookmarks = (newBookmarks: number[]): void => {
  bookmarks = newBookmarks;
};
