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
    .map((arr, idx) => {
      return `<div class=chunked-${idx + 1}><div>${arr
        // 배열의 마지막 원소가 빈 문자열일 때 join하면 개행이 사라지므로 이를 확인하여 추가
        .map((item, idx2) => (item === "" && idx2 === 14 ? "<br/>" : item))
        .join("\n")}</div></div>`;
    })
    .join("");
