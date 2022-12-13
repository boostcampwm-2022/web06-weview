import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Label } from "@/types/search";
import useSearchStore from "@/store/useSearchStore";
import { isEnterKey } from "@/utils/pressedKeyCheck";
import useLabelStore from "@/store/useLabelStore";
import { createLabel, createSearchFilter, isEqualLabel } from "@/utils/label";
import { LABEL_NAME } from "@/constants/label";

interface UseLabelResult {
  word: string;
  labels: Label[];
  insertLabel: (label: Label) => void;
  removeLabel: (label: Label) => void;
  removeAndInsert: (removeTargetLabel: Label, insertTargetLabel: Label) => void;
  handleWordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWordKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (searchLabels?: Label[]) => void;
  handleSearchSubmit: () => void;
  loadLabels: (targetLabels: Label[]) => void;
}

const useSearch = (): UseLabelResult => {
  const [searchDefaultFilter] = useSearchStore((state) => [
    state.searchDefaultFilter,
  ]);
  const navigate = useNavigate();
  const [word, setWord] = useState(""); // 입력중인 검색어
  const [labels, setLabels] = useLabelStore((state) => [
    state.labels,
    state.setLabels,
  ]);

  // labels 목록에서 라벨 검색
  const hasLabel = (targetLabel: Label): boolean => {
    return (
      labels.find((label: Label) => isEqualLabel(label, targetLabel)) !==
      undefined
    );
  };

  // labels 목록에서 라벨 제거
  const removeLabel = useCallback(
    (targetLabel: Label): void => {
      setLabels(labels.filter((label) => !isEqualLabel(label, targetLabel)));
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

  const removeAndInsert = useCallback(
    (removeTargetLabel: Label, insertTargetLabel: Label): void => {
      const newLabels = [
        ...labels.filter((label) => !isEqualLabel(label, removeTargetLabel)),
        insertTargetLabel,
      ];
      setLabels(newLabels);
    },
    [labels, setLabels]
  );

  const loadLabels = useCallback(
    (targetLabels: Label[]): void => {
      setLabels([...targetLabels]);
    },
    [setLabels]
  );

  // PostScroll 에 현재 검색 필터를 적용
  const handleSubmit = (searchLabels: Label[] | undefined = labels): void => {
    navigate("/");
    searchDefaultFilter(createSearchFilter(searchLabels));
  };

  const handleSearchSubmit = (): void => {
    if (word.length === 0) {
      return handleSubmit();
    }
    const newLabel = createLabel(word);
    const newLabels = [
      ...labels.filter((label) => label.type !== LABEL_NAME.DETAILS),
      newLabel,
    ];
    // 중복된 라벨이 없을 경우 등록
    setLabels(newLabels);
    setWord("");
    navigate("/");
    searchDefaultFilter(createSearchFilter(newLabels));
  };

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWord(e.target.value);
  };

  const handleWordKeyUp = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!isEnterKey(e.key)) {
      return;
    }
    handleSearchSubmit();
  };

  return {
    word,
    labels,
    insertLabel,
    handleWordChange,
    handleWordKeyUp,
    handleSubmit,
    handleSearchSubmit,
    removeLabel,
    removeAndInsert,
    loadLabels,
  };
};

export default useSearch;
