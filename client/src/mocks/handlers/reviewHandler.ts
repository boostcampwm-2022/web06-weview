import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { reviews } from "@/mocks/datasource/mockDataSource";

const ONE_REQUEST_REVIEWS_COUNT = 3;

const baseUrl = API_SERVER_URL;

export const reviewHandler = [
  rest.get(`${baseUrl}/posts/:postId/reviews`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        reviews: reviews.slice(lastId, lastId + ONE_REQUEST_REVIEWS_COUNT),
        lastId: lastId + ONE_REQUEST_REVIEWS_COUNT - 1,
        isLast: reviews.length <= lastId + ONE_REQUEST_REVIEWS_COUNT,
      })
    );
  }),
  rest.post(`${baseUrl}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "리뷰 작성에 성공했습니다." })
    );
  }),
];
