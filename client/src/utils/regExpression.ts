export const SPACE_REGEX = /" "/g;
export const NEW_LINE_REGEX = /\n/g;

export const formatTag = (tag: string): string =>
  tag.replace(/[\s_]/g, "-").toLowerCase();
