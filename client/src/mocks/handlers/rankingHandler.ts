import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";
import { shuffleArray } from "@/mocks/utils/mockUtils";
import { rankingData } from "@/mocks/datasource/mockDataSource";

const baseUrl = API_SERVER_URL;

export const rankingHandler = [
  rest.get(`${baseUrl}/ranking/tags`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(shuffleArray(rankingData)));
  }),
];
