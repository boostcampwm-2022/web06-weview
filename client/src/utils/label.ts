import { Label, LabelType, SearchFilter, SearchHistory } from "@/types/search";
import { SEPARATOR } from "@/constants/search";
import { formatTag } from "@/utils/regExpression";
import { LABEL_NAME } from "@/constants/label";

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
      case LABEL_NAME.TAGS:
        prev.tags?.push(value);
        break;
      case LABEL_NAME.REVIEWS:
        prev.reviewCount = Number(value);
        break;
      case LABEL_NAME.LIKES:
        prev.likeCount = Number(value);
        break;
      case LABEL_NAME.DETAILS:
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
        labels.push({ type: key as LabelType, value: labelValue })
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

  return { type: type as LabelType, value: formatTag(value.trim()) };
};

export const isEqualLabel = (labelA: Label, labelB: Label): boolean => {
  return labelA.type === labelB.type && labelA.value === labelB.value;
};
