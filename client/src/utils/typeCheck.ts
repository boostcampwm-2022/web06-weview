export const isEmpty = (value: any): boolean => {
  if (typeof value === "undefined" || value === null || value === "")
    return true;
  return false;
};
