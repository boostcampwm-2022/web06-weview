import { Label, SearchFilter, SearchHistory } from "@/types/search";
import { SEPARATOR } from "@/constants/search";
import { formatTag } from "@/utils/regExpression";

export const createSearchFilter = (inputLabels: Label[]): SearchFilter => {
  const searchFilter: SearchFilter = {
    lastId: "-1",
    tags: [],
    reviewCount: 0,
    likeCount: 0,
    details: [],
  };

  inputLabels.reduce((prev: SearchFilter, { type, value }: Label) => {
    switch (type) {
      case "tags":
        prev.tags?.push(value);
        break;
      case "reviews":
        prev.reviewCount = Number(value);
        break;
      case "likes":
        prev.likeCount = Number(value);
        break;
      case "details":
        prev.details?.push(value);
        break;
    }
    return prev;
  }, searchFilter);

  return searchFilter;
};

export const labelsFrom = (history: SearchHistory): Label[] => {
  const labels: Label[] = [];

  history.tags?.forEach((value) =>
    labels.push({
      value,
      type: "tags",
    })
  );
  history.details?.forEach((value) =>
    labels.push({
      value,
      type: "details",
    })
  );
  if (history.reviewCount !== null) {
    labels.push({
      value: `${history.reviewCount}`,
      type: "reviews",
    });
  }
  if (history.likeCount !== null) {
    labels.push({
      value: `${history.likeCount}`,
      type: "likes",
    });
  }

  return labels;
};

export const createLabel = (word: string): Label => {
  const separator = word[0];
  const value = word.slice(1);
  const type = SEPARATOR[separator] ?? "details";

  if (type === "details") {
    // 상세 검색은 띄어쓰기를 포맷팅하지 않는다.
    return { type, value: word.trim() };
  }

  return { type, value: formatTag(value.trim()) };
};

export const labelEqual = (labelA: Label, labelB: Label): boolean => {
  return labelA.type === labelB.type && labelA.value === labelB.value;
};
