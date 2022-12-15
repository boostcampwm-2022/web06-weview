import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Label, LabelType } from "@/types/search";
import useSearchStore from "@/store/useSearchStore";
import { isEnterKey } from "@/utils/pressedKeyCheck";
import useLabelStore, { getSearchState } from "@/store/useLabelStore";
import {
  createLabel,
  createSearchFilter,
  filterLabels,
  flatLabels,
  isEqualLabel,
} from "@/utils/label";
import { LABEL_NAME } from "@/constants/label";
import { formatTag } from "@/utils/regExpression";
import { MAX_SEARCH_TAGS_COUNT } from "@/constants/search";

interface UseLabelResult {
  word: string;
  totalLabels: Label[];
  labels: Label[];
  hasLabel: (targetLabel: Label, targetLabels: Label[]) => boolean;
  setLabels: (labels: Label[]) => void;
  insertLabel: (label: Label) => void;
  removeLabel: (label: Label) => void;
  handleWordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWordKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (searchLabels?: Label[]) => void;
  handleSearchSubmit: () => void;
  loadLabels: (targetLabels: Label[]) => void;
  handleInsertTag: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const useSearch = (
  labelType: LabelType = LABEL_NAME.DETAILS
): UseLabelResult => {
  const [searchDefaultFilter] = useSearchStore((state) => [
    state.searchDefaultFilter,
  ]);
  const navigate = useNavigate();
  const [word, setWord] = useState(""); // 입력중인 검색어
  const store = useLabelStore(); // LabelStore 구독
  /**
   * totalLabels: { details: [], tags: [], likes: [], reviews: [] }
   * setTotalLabels: totalLabels 업데이트 함수
   * labels: 현재 LabelType 전역 상태
   * setLabels: 현재 LabelType 전역 상태 업데이트 함수
   */
  const [totalLabels, setTotalLabels, labels, setLabels] = getSearchState(
    store,
    labelType
  );

  // labels 목록에서 라벨 검색
  const hasLabel = (targetLabel: Label, targetLabels: Label[]): boolean => {
    return (
      targetLabels.find((label: Label) => isEqualLabel(label, targetLabel)) !==
      undefined
    );
  };

  // labels 목록에서 라벨 제거
  const removeLabel = useCallback(
    (targetLabel: Label): void => {
      const targetLabels = totalLabels[targetLabel.type].filter(
        (label) => !isEqualLabel(label, targetLabel)
      );
      setTotalLabels({ ...totalLabels, [targetLabel.type]: targetLabels });
    },
    [totalLabels, setTotalLabels]
  );

  // 중복되지 않은 라벨 등록
  const insertLabel = useCallback(
    (targetLabel: Label): void => {
      const targetLabels = totalLabels[targetLabel.type];
      if (!hasLabel(targetLabel, targetLabels)) {
        setTotalLabels({
          ...totalLabels,
          [targetLabel.type]: [...targetLabels, targetLabel],
        });
      }
    },
    [totalLabels, setTotalLabels]
  );

  const loadLabels = useCallback(
    (targetLabels: Label[]): void => {
      setTotalLabels(filterLabels(targetLabels));
    },
    [setTotalLabels]
  );

  // PostScroll 에 현재 검색 필터를 적용
  const handleSubmit = (searchLabels?: Label[]): void => {
    if (searchLabels === undefined) {
      // 입력한 값이 없다면 현재 전역 상태 값을 사용
      searchDefaultFilter(createSearchFilter(flatLabels(totalLabels)));
      return navigate("/");
    }
    const totalLabelsForSubmit = filterLabels(searchLabels);
    searchDefaultFilter(createSearchFilter(flatLabels(totalLabelsForSubmit)));
    navigate("/");
  };

  const handleSearchSubmit = (): void => {
    if (word.length === 0) {
      return handleSubmit();
    }
    const newLabel = createLabel(word, LABEL_NAME.DETAILS);
    const newLabels = [
      ...labels.filter((label) => label.type !== LABEL_NAME.DETAILS),
      newLabel,
    ];
    // 중복된 라벨이 없을 경우 등록
    setLabels(newLabels);
    setWord("");
    searchDefaultFilter(
      createSearchFilter(
        flatLabels({
          ...totalLabels,
          details: newLabels,
        })
      )
    );
    navigate("/");
  };

  const handleInsertTag = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      word.length === 0 ||
      !isEnterKey(e.key) ||
      MAX_SEARCH_TAGS_COUNT <= labels.length
    ) {
      return;
    }
    const newLabel = createLabel(formatTag(word.trim()), LABEL_NAME.TAGS);
    if (!hasLabel(newLabel, labels)) {
      // 중복된 라벨이 없을 경우 등록
      setLabels([...labels, newLabel]);
      setWord("");
    }
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
    totalLabels: flatLabels(totalLabels),
    labels,
    hasLabel,
    setLabels,
    insertLabel,
    handleWordChange,
    handleWordKeyUp,
    handleSubmit,
    handleSearchSubmit,
    removeLabel,
    loadLabels,
    handleInsertTag,
  };
};

export default useSearch;
