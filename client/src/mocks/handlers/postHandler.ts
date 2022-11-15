import { PostInfo } from "@/types/post";
import { rest } from "msw";

// Backend API Server URL
const baseUrl = import.meta.env.VITE_API_SERVER_URL;

const posts = Array.from(Array(1024).keys()).map(
  (id): PostInfo => ({
    id: `${id}`,
    title: `title${id}`,
    content: `post_contents_${id}`,
    imageUrls: [
      "http://placeimg.com/640/640/animals",
      "http://placeimg.com/640/640/animals",
    ],
    user: {
      id: `${id + 10000}`,
      username: `sampleUser_${id + 10000}`,
      profileUrl: "http://placeimg.com/640/640/animals",
      email: `name_${id + 10000}@gmail.com`,
    },
    tags: [`tag1`, `tag2`],
    reviews: [],
    updatedAt: "2022-11-14 16:42:56.124939",
    code: `sourcecode: ~~~~~~~~~~~~~~~~~~`,
  })
);

export const postHandlers = [
  rest.get(`${baseUrl}api/posts`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId"));
    const size = Number(req.url.searchParams.get("size"));
    const isLast = posts.length <= lastId + size;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        posts: posts.slice(lastId, lastId + size),
        lastId: lastId + size,
        isLast,
      })
    );
  }),

  rest.post(`${baseUrl}api/posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "글 작성에 성공했습니다." })
    );
  }),
];
