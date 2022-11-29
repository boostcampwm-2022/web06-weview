export const LINE_COUNT_REGEX = /\r\n|\r|\n/;
export const OPEN_TAG_REGEX = /</g;
export const CLOSE_TAG_REGEX = />/g;
export const SPACE_REGEX = /" "/g;
export const NEW_LINE_REGEX = /\n/g;

export const formatTag = (tag: string): string =>
  tag.replace(/[\s_]/g, "-").toLowerCase();

export const preventXSS = (html: string): string =>
  html.replace(OPEN_TAG_REGEX, "&lt;").replace(CLOSE_TAG_REGEX, "&gt;");
