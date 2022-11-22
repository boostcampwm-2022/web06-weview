export const setQueryString = (obj: any): string =>
  Object.entries(obj)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(",")}`;
      }
      return `${key}=${String(value)}`;
    })
    .join("&");
