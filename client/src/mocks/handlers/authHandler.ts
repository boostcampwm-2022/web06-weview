import { rest } from "msw";
import { mockUser } from "@/mocks/mockData";
import { API_SERVER_URL } from "@/constants/env";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

export const authHandler = [
  rest.get(`${baseUrl}/auth/github`, (req, res, ctx) => {
    const code = req.url.searchParams.get("code");
    if (code != null) {
      return res(ctx.status(200), ctx.delay(1000), ctx.json(mockUser));
    }
  }),
  rest.delete(`${baseUrl}/auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
