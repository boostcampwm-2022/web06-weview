import { API_SERVER_URL } from "@/constants/env";
import { rest } from "msw";
import { ReviewInfo } from "@/types/review";

const ONE_REQUEST_REVIEWS_COUNT = 3;

const baseUrl = API_SERVER_URL;

const reviews: ReviewInfo[] = Array.from(Array(1024).keys()).map((id) => ({
  id: String(id),
  reviewer: {
    id: String(Math.floor(Math.random() * 3000)),
    nickname: String(Math.floor(Math.random() * 3000)) + "author",
    profileUrl: "https://avatars.githubusercontent.com/u/55542546?v=4",
    email: String(Math.floor(Math.random() * 3000)) + "@naver.com",
  },
  content: "LGTM~乃~乃~乃",
  updatedAt: "2022-11-14 16:42:56.124939",
}));

export const reviewHandler = [
  rest.get(`${baseUrl}/posts/:postId/reviews`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        reviews: reviews.slice(lastId + ONE_REQUEST_REVIEWS_COUNT),
        lastId: lastId + ONE_REQUEST_REVIEWS_COUNT - 1,
        isLast: reviews.length <= lastId + ONE_REQUEST_REVIEWS_COUNT,
      })
    );
  }),
];
