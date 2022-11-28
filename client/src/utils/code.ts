import { NEW_LINE_REGEX, SPACE_REGEX } from "@/utils/regExpression";

export const getLineCount = (code: string): number => code.split("\n").length;

export const formatHighlightedHTML = (html: string): string =>
  html.replace(SPACE_REGEX, "&nbsp;").replace(NEW_LINE_REGEX, "<br/>");
