export const getHashTags = (content: string): string[] | undefined =>
  content.match(/#[^\s#]+/g)?.map((tag) => tag.slice(1));
