export const LINE_COUNT_REGEX = /\r\n|\r|\n/;

export const FIND_ALL_HASH_TAG_REGEX = /#[^\s#]+/g;

export const getHashTags = (content: string): string[] | undefined =>
  content.match(FIND_ALL_HASH_TAG_REGEX)?.map((tag) => tag.slice(1));

export const formatTag = (tag: string): string =>
  tag.replace(/_/g, "-").toLowerCase();
