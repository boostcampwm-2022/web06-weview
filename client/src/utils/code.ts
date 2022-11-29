import { NEW_LINE_REGEX, SPACE_REGEX } from "@/utils/regExpression";
import { ONE_SNAPSHOT_LINE_COUNT } from "@/constants/code";

export const getLineCount = (code: string): number => code.split("\n").length;

export const formatHighlightedHTML = (html: string): string =>
  html.replace(SPACE_REGEX, "&nbsp;");

// html을 줄바꿈 기준으로 자른다.

export const splitHTML = (html: string): string[] => html.split(NEW_LINE_REGEX);

// 잘라진 html을 특정 개수만큼씩 div로 묶는다.
export const chunkHTML = (htmlData: string[]): string[][] => {
  const arr = [];
  for (let i = 0; i < htmlData.length; i += ONE_SNAPSHOT_LINE_COUNT) {
    arr.push(htmlData.slice(i, i + ONE_SNAPSHOT_LINE_COUNT));
  }
  return arr;
};

export const wrapHTML = (chunkedHTML: string[][]): string =>
  chunkedHTML
    .map(
      (arr, idx) =>
        `<div class=chunked-${idx + 1}><div>${arr.join("\n")}</div></div>`
    )
    .join("");
