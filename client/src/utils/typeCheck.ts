export const isEmpty = (value: any): boolean => {
  if (typeof value === "undefined" || value === null || value === "")
    return true;
  return false;
};

export const isEmptyArray = (value: any[]): boolean =>
  Array.isArray(value) && value.length === 0;

export const isLessThanOne = (value: any): boolean =>
  typeof value === "number" && value < 1;

export const isQueryTypeFine = (value: any): boolean => {
  if (isEmpty(value)) return false;
  if (isEmptyArray(value)) return false;
  if (isLessThanOne(value)) return false;
  return true;
};
