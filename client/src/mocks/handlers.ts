import { authHandler } from "@/mocks/handlers/authHandler";
import { postHandler } from "@/mocks/handlers/postHandler";
import { reviewHandler } from "@/mocks/handlers/reviewHandler";
import { rankingHandler } from "@/mocks/handlers/rankingHandler";
import { searchHandler } from "@/mocks/handlers/searchHandler";
import { bookmarkHandler } from "@/mocks/handlers/bookmarkHandler";

export const handlers = [
  ...authHandler,
  ...postHandler,
  ...reviewHandler,
  ...rankingHandler,
  ...searchHandler,
  ...bookmarkHandler,
];
