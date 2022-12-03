import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";

import { Label, SearchQuery } from "@/types/search";
import useSearchStore from "@/store/useSearchStore";
import { isEnterKey } from "@/utils/pressedKeyCheck";
import { SEPARATOR } from "@/constants/search";
import { formatTag } from "@/utils/regExpression";
import useLabelStore from "@/store/useLabelStore";

const createSearchQuery = (inputLabels: Label[]): SearchQuery => {
  return inputLabels.reduce(
    (prev: SearchQuery, { type, value }: Label) => {
      switch (type) {
        case "tag":
          prev.tags?.push(value);
          break;
        case "category":
          prev.category = value;
          break;
        case "author":
          prev.authors?.push(value);
          break;
        case "reviews":
          prev.reviews = Number(value);
          break;
        case "likes":
          prev.likes = Number(value);
          break;
        case "detail":
          prev.detail = value;
          break;
      }
      return prev;
    },
    {
      lastId: "-1",
      tags: [],
      authors: [],
      category: "",
      reviews: 0,
      likes: 0,
      detail: "",
    }
  );
};

const createLabel = (word: string): Label => {
  const separator = word[0];
  const value = word.slice(1);
  const type = SEPARATOR[separator] ?? "detail";

  if (type === "detail") {
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
    const searchQuery = createSearchQuery(labels);
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
