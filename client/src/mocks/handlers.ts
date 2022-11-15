import { authHandlers } from "@/mocks/handlers/authHandler";
import { postHandlers } from "@/mocks/handlers/postHandler";

export const handlers = [...authHandlers, ...postHandlers];
