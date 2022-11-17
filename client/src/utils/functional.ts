export const pipe = (initialValue: any, ...functions: Function[]): any => {
  return functions.reduce((acc, f) => {
    return f(acc);
  }, initialValue);
};
