import { PostInfo } from "@/types/post";
import { rest } from "msw";
import { API_SERVER_URL } from "@/constants/env";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

const posts = Array.from(Array(1024).keys()).map(
  (id): PostInfo => ({
    id: `${id}`,
    title: `title${id}`,
    content: `post_contents_${id}`,
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
    tags: [`tag1`, `tag2`],
    reviews: [],
    updatedAt: "2022-11-16 12:26:56.124939",
    code: `sourcecode: ~~~~~~~~~~~~~~~~~~`,
    language: `javascript`,
  })
);

export const postHandlers = [
  rest.get(`${baseUrl}/posts`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;
    const SIZE = 3;
    const isLast = posts.length <= lastId + SIZE;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        posts: posts.slice(lastId, lastId + SIZE),
        lastId: lastId + SIZE,
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
];
