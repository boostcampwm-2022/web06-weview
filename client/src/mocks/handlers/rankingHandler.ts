import { rest } from "msw";

import { API_SERVER_URL } from "@/constants/env";

const baseUrl = API_SERVER_URL;

const shuffleArray = (
  arr: Array<{ name: string; prev: number }>
): Array<{ name: string; prev: number }> => arr.sort(() => Math.random() - 0.5);

const rankingData = [
  { name: "javascript", prev: 2 },
  { name: "java", prev: 3 },
  { name: "sort", prev: 1 },
  { name: "algorithm", prev: 12 },
  { name: "coding-testzxcvzxvxzcvzxvzxc", prev: 5 },
  { name: "quick-sort", prev: 6 },
  { name: "sort-array", prev: 9 },
  { name: "promise", prev: 8 },
  { name: "layout", prev: 7 },
  { name: "kotlin", prev: 13 },
];

export const rankingHandler = [
  rest.get(`${baseUrl}/ranking/tags`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(shuffleArray(rankingData)));
  }),
];
