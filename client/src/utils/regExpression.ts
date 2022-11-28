export const LINE_COUNT_REGEX = /\r\n|\r|\n/;

export const FIND_ALL_HASH_TAG_REGEX = /#[^\s#]+/g;

export const OPEN_TAG_REGEX = /</g;
export const CLOSE_TAG_REGEX = />/g;
export const SPACE_REGEX = /" "/g;
export const NEW_LINE_REGEX = /"\n"/g;

export const getHashTags = (content: string): string[] | undefined =>
  content.match(FIND_ALL_HASH_TAG_REGEX)?.map((tag) => tag.slice(1));

export const formatTag = (tag: string): string =>
  tag.replace(/[\s_]/g, "-").toLowerCase();

export const preventXSS = (html: string): string =>
  html.replace(OPEN_TAG_REGEX, "&lt;").replace(CLOSE_TAG_REGEX, "&gt;");
