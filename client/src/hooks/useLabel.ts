import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

import { Label, SearchFilter } from "@/types/search";
import useSearchStore from "@/store/useSearchStore";
import { isEnterKey } from "@/utils/pressedKeyCheck";
import { SEPARATOR } from "@/constants/search";
import { formatTag } from "@/utils/regExpression";
import useLabelStore from "@/store/useLabelStore";

const createSearchFilter = (inputLabels: Label[]): SearchFilter => {
  const searchFilter: SearchFilter = {
    lastId: "-1",
    tags: [],
    reviewCount: 0,
    likeCount: 0,
    details: [],
  };

  inputLabels.reduce((prev: SearchFilter, { type, value }: Label) => {
    switch (type) {
      case "tag":
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

const createLabel = (word: string): Label => {
  const separator = word[0];
  const value = word.slice(1);
  const type = SEPARATOR[separator] ?? "details";

  if (type === "details") {
    // 상세 검색은 띄어쓰기를 포맷팅하지 않는다.
    return { type, value: word.trim() };
  }

  return { type, value: formatTag(value.trim()) };
};

const labelEqual = (labelA: Label, labelB: Label): boolean => {
  return labelA.type === labelB.type && labelA.value === labelB.value;
};

interface UseLabelResult {
  word: string;
  labels: Label[];
  insertLabel: (label: Label) => void;
  removeLabel: (label: Label) => void;
  handleWordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWordKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const useLabel = (): UseLabelResult => {
  const [updateQuery] = useSearchStore((state) => [state.updateQuery]);
  const [word, setWord] = useState(""); // 입력중인 검색어
  const [labels, setLabels] = useLabelStore((state) => [
    state.labels,
    state.setLabels,
  ]);

  // labels 목록에서 라벨 검색
  const hasLabel = (targetLabel: Label): boolean => {
    return (
      labels.find((label: Label) => labelEqual(label, targetLabel)) !==
      undefined
    );
  };

  // labels 목록에서 라벨 제거
  const removeLabel = useCallback(
    (targetLabel: Label): void => {
      setLabels([...labels.filter((label) => !labelEqual(label, targetLabel))]);
    },
    [labels, setLabels]
  );

  // 중복되지 않은 라벨 등록
  const insertLabel = useCallback(
    (targetLabel: Label): void => {
      if (!hasLabel(targetLabel)) {
        setLabels([...labels, targetLabel]);
      }
    },
    [labels, setLabels]
  );

  // PostScroll 에 현재 검색 필터를 적용
  const handleSubmit = (): void => {
    const searchQuery = createSearchFilter(labels);
    updateQuery(searchQuery);
  };

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWord(e.target.value);
  };

  const handleWordKeyUp = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!isEnterKey(e.key) || word.length === 0) {
      return;
    }
    const newLabel = createLabel(word);
    if (!hasLabel(newLabel)) {
      // 중복된 라벨이 없을 경우 등록
      setLabels([...labels, newLabel]);
      setWord("");
    }
  };

  return {
    word,
    labels,
    insertLabel,
    handleWordChange,
    handleWordKeyUp,
    handleSubmit,
    removeLabel,
  };
};

export default useLabel;
