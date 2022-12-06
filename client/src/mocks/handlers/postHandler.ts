import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { parsePostQueryString } from "@/mocks/utils/mockUtils";
import { posts, history, bookmarks } from "@/mocks/datasource/mockDataSource";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

let id = 0;
const SIZE = 3;

export const postHandler = [
  rest.get(`${baseUrl}/posts`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;
    const { tags, reviewCount, likeCount, details } = parsePostQueryString(
      req.url
    );

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
      )
      .map((post) => ({
        ...post,
        isBookmarked: bookmarks.includes(Number(post.id)),
      }));
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
    const postId = req.params.postId;
    posts
      .filter((post) => post.id === postId)
      .map((post) => (post.isLiked = true));
    return res(ctx.status(200));
  }),
  rest.delete(`${baseUrl}/posts/:postId/likes`, (req, res, ctx) => {
    const postId = req.params.postId;
    posts
      .filter((post) => post.id === postId)
      .map((post) => (post.isLiked = false));
    return res(ctx.status(200));
  }),
  rest.get(`${baseUrl}/users/:userId/posts`, (req, res, ctx) => {
    const userId = String(req.params.userId);
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;

    const filteredData = posts.filter((post) => post.author.id === userId);

    const isLast = filteredData.length <= lastId + SIZE;

    return res(
      ctx.status(200),
      ctx.delay(300),
      ctx.json({
        posts: filteredData.slice(lastId, lastId + SIZE),
        lastId: lastId + SIZE - 1,
        isLast,
      })
    );
  }),
  rest.get(`${baseUrl}/posts/:postId`, (req, res, ctx) => {
    const postId = req.params.postId;
    return res(ctx.status(200), ctx.json({ post: posts[Number(postId)] }));
  }),
];
