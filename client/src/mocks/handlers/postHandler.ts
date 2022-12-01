import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { parsePostQueryString } from "@/mocks/utils/postUtils";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

const posts = Array.from(Array(1024).keys()).map((id) => ({
  id: `${id}`,
  title: `제목_${id}`,
  content: `내용_${id}`,
  images: [
    {
      src: "http://placeimg.com/640/640/animals",
      name: "image1",
    },
    {
      src: "http://placeimg.com/640/640/animals",
      name: "image1",
    },
  ],
  author: {
    id: `${id + 10000}`,
    nickname: `sampleUser_${id + 10000}`,
    profileUrl: "http://placeimg.com/640/640/animals",
    email: `name_${id + 10000}@gmail.com`,
  },
  tags: [`tag1`, `tag2`, id % 2 === 0 ? `테그` : `태그`],
  reviews: Array.from(Array(id % 3).keys()),
  updatedAt: "2022-11-16 12:26:56.124939",
  code: `sourcecode: ~~~~~~~~~~~~~~~~~~`,
  language: `javascript`,
  category: id % 2 === 0 ? "리뷰요청" : "질문",
  likes: id % 10,
  isLiked: id % 2 === 0,
}));

export const postHandler = [
  rest.get(`${baseUrl}/posts`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;
    const { tags, authors, category, reviews, likes, detail } =
      parsePostQueryString(req.url);
    const SIZE = 3;
    const filteredData = posts
      .filter(
        (post) =>
          tags.length === 0 ||
          post.tags.some((postTag) => tags.includes(postTag))
      )
      .filter(
        (post) => authors.length === 0 || authors.includes(post.author.nickname)
      )
      .filter((post) => category === "" || category === post.category)
      .filter((post) => reviews <= post.reviews.length)
      .filter((post) => likes <= (post.likes ?? 0))
      .filter(
        (post) =>
          post.title.search(detail) > -1 || post.content.search(detail) > -1
      );
    const isLast = filteredData.length <= lastId + SIZE;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        posts: filteredData.slice(lastId, lastId + SIZE),
        lastId: lastId + SIZE - 1,
        isLast,
      })
    );
  }),

  rest.post(`${baseUrl}/posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "글 작성에 성공했습니다." })
    );
  }),

  rest.post(`${baseUrl}/posts/:postId/likes`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(`${baseUrl}/posts/:postId/likes`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
