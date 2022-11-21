export const setQueryString = (obj: any): string =>
  Object.entries(obj)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(",")}`;
      }
      if (typeof value === "string") return `${key}=${value}`;
      return `${key}=${value as number}`;
    })
    .join("&");
