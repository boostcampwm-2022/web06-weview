import { isQueryTypeFine } from "@/utils/typeCheck";
import { SearchQuery } from "@/types/post";

export const setQueryString = (searchingObj: SearchQuery): string =>
  Object.entries(searchingObj)
    .filter(([key, value]) => key === "lastId" || isQueryTypeFine(value))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(",")}`;
      }
      return `${key}=${String(value)}`;
    })
    .join("&");
