export const LINE_COUNT_REGEX = /\r\n|\r|\n/;

export const getHashTags = (content: string): string[] | undefined =>
  content.match(/#[^\s#]+/g)?.map((tag) => tag.slice(1));

export const formatTag = (tag: string): string =>
  tag.replace(/_/g, "-").toLowerCase();
