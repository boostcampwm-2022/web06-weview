import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { history, setHistory } from "@/mocks/datasource/mockDataSource";

// Backend API Server URL
const baseUrl = API_SERVER_URL;

export const searchHandler = [
  rest.get(`${baseUrl}/search/histories`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(history));
  }),
  rest.delete(`${baseUrl}/search/histories/:id`, (req, res, ctx) => {
    setHistory(
      history.filter((searchHistory) => searchHistory.id !== req.params.id)
    );
    return res(ctx.status(204), ctx.delay(1000));
  }),
];
