import { isQueryTypeFine } from "@/utils/typeCheck";
import { SearchFilter } from "@/types/search";

export const setQueryString = (searchingObj: SearchFilter): string =>
  Object.entries(searchingObj)
    .filter(([key, value]) => key === "lastId" || isQueryTypeFine(value))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${value.map((v) => `${key}[]=${encodeURI(v)}`).join("&")}`;
      }
      return `${key}=${String(encodeURI(value))}`;
    })
    .join("&");
