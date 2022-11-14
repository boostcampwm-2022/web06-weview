import { PostInfo } from "@/types/post";
import { rest } from "msw";

// Backend API Server URL
const baseUrl = import.meta.env.VITE_API_SERVER_URL;

const posts = Array.from(Array(1024).keys()).map(
  (id): PostInfo => ({
    id: `${id}`,
    title: `title${id}`,
    contents: `post_contents_${id}`,
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
  })
);

export const postHandlers = [
  rest.get(`${baseUrl}api/posts`, (req, res, ctx) => {
    const lastId = req.url.searchParams.get("lastId");
    const size = Number(lastId);
    const isLast = posts.length >= size + 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        posts: posts.slice(size, size + 1),
        lastId: size + 1,
        isLast,
      })
    );
  }),
];
