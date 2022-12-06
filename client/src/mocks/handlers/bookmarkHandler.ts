import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import {
  bookmarks,
  posts,
  setBookmarks,
} from "@/mocks/datasource/mockDataSource";

// Backend API Server URL
const baseUrl = API_SERVER_URL;
const SIZE = 3;

export const bookmarkHandler = [
  rest.get(`${baseUrl}/bookmarks`, (req, res, ctx) => {
    const lastId = Number(req.url.searchParams.get("lastId")) + 1;
    const filteredData = posts.filter((post) =>
      bookmarks.some((bookmark) => bookmark === Number(post.id))
    );
    const isLast = filteredData.length <= lastId + SIZE;

    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json({
        posts: filteredData.slice(lastId, lastId + SIZE),
        lastId: lastId + SIZE - 1,
        isLast,
      })
    );
  }),
  rest.post(`${baseUrl}/bookmarks`, async (req, res, ctx) => {
    const { postId } = await req.json();

    if (bookmarks.every((bookmark) => bookmark !== postId)) {
      bookmarks.push(postId);
    }

    const response = await res(
      ctx.status(200),
      ctx.json({ message: "북마크에 성공했습니다." })
    );
    return response;
  }),
  rest.delete(`${baseUrl}/bookmarks`, (req, res, ctx) => {
    const postId = Number(req.url.searchParams.get("postId"));

    setBookmarks(bookmarks.filter((bookmark) => bookmark !== postId));

    return res(
      ctx.status(200),
      ctx.json({ message: "북마크 제거에 성공했습니다." })
    );
  }),
];
