import { isQueryTypeFine } from "@/utils/typeCheck";
import { SearchQuery } from "@/types/search";

export const setQueryString = (searchingObj: SearchQuery): string =>
  Object.entries(searchingObj)
    .filter(([key, value]) => key === "lastId" || isQueryTypeFine(value))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.map((v) => encodeURI(v)).join(",")}`;
      }
      return `${key}=${String(encodeURI(value))}`;
    })
    .join("&");
