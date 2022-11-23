import { authHandler } from "@/mocks/handlers/authHandler";
import { postHandler } from "@/mocks/handlers/postHandler";

export const handlers = [...authHandler, ...postHandler];
