import { rest } from "msw";
import { mockUser } from "@/mocks/mockData";

export const handlers = [
  rest.get("http://localhost:8000/api/auth/github", (req, res, ctx) => {
    const code = req.url.searchParams.get("code");
    if (code != null) {
      return res(ctx.status(200), ctx.delay(1000), ctx.json(mockUser));
    }
  }),
];
