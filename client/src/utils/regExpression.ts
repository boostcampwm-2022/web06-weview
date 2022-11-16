export const getHashTags = (content: string): string[] | undefined =>
  content.match(/#[^\s#]+/g)?.map((tag) => tag.slice(1));

export const LINE_COUNT_REGEX = /\r\n|\r|\n/;
