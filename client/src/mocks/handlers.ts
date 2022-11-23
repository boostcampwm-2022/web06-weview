import { authHandler } from "@/mocks/handlers/authHandler";
import { postHandler } from "@/mocks/handlers/postHandler";
import { reviewHandler } from "@/mocks/handlers/reviewHandler";

export const handlers = [...authHandler, ...postHandler, ...reviewHandler];
