import { authHandler } from "@/mocks/handlers/authHandler";
import { postHandler } from "@/mocks/handlers/postHandler";
import { reviewHandler } from "@/mocks/handlers/reviewHandler";
import { rankingHandler } from "@/mocks/handlers/rankingHandler";

export const handlers = [
  ...authHandler,
  ...postHandler,
  ...reviewHandler,
  ...rankingHandler,
];
