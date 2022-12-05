import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { parsePostQueryString } from "@/mocks/utils/mockUtils";
import { posts, history } from "@/mocks/datasource/mockDataSource";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

let id = 0;

export const postHandler = [
  rest.get(`${baseUrl}/posts`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;
    const { tags, reviewCount, likeCount, details } = parsePostQueryString(
      req.url
    );
    const SIZE = 3;
    const filteredData = posts
      .filter(
        (post) =>
          tags === undefined ||
          tags.length === 0 ||
          post.tags.some((postTag) => tags.includes(postTag))
      )
      .filter((post) => (reviewCount ?? 0) <= post.reviewCount)
      .filter((post) => (likeCount ?? 0) <= post.likeCount)
      .filter(
        (post) =>
          details === undefined ||
          details.length === 0 ||
          details.some(
            (detail) =>
              post.title.search(detail) > -1 ||
              post.content.search(detail) > -1 ||
              post.author.nickname.search(detail) > -1
          )
      );
    const isLast = filteredData.length <= lastId + SIZE;

    history.push({
      author: "mock-user",
      details: details ?? null,
      likeCount: likeCount ?? null,
      reviewCount: reviewCount ?? null,
      tags: tags ?? null,
      updatedAt: Date(),
      id: String(++id),
    });

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
