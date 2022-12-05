import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { history } from "@/mocks/datasource/mockDataSource";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

export const searchHandler = [
  rest.get(`${baseUrl}/search/histories`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(history));
  }),
];
