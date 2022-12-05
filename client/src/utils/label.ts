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

  Object.entries(history).forEach(([key, value]) => {
    if (value === null) {
      return;
    }
    if (Array.isArray(value)) {
      return value.forEach((labelValue) =>
        labels.push({ type: key, value: labelValue })
      );
    }
    if (key === "reviewCount") {
      return labels.push({ type: "reviews", value });
    }
    if (key === "likeCount") {
      return labels.push({ type: "likes", value });
    }
  });

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

export const isEqualLabel = (labelA: Label, labelB: Label): boolean => {
  return labelA.type === labelB.type && labelA.value === labelB.value;
};
