import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { isEnterKey } from "@/utils/pressedKeyCheck";
import SearchLabel from "@/components/Modal/SearchModal/SearchForm/SearchLabel/SearchLabel";
import { Label, SearchQuery } from "@/types/search";
import { SEPARATOR } from "@/constants/search";
import useSearchStore from "@/store/useSearchStore";
import { formatTag } from "@/utils/regExpression";

const createLabel = (word: string): Label => {
  const separator = word[0];
  const value = word.slice(1);
  const type = SEPARATOR[separator] ?? "detail";

  if (type === "detail") {
    return { type, value: formatTag(word.trim()) };
  }

  return { type, value: formatTag(value.trim()) };
};

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

const SearchForm = (): JSX.Element => {
  const [updateQuery] = useSearchStore((state) => [state.updateQuery]);
  const [word, setWord] = useState("");
  const [labels, setLabels] = useState<Label[]>([]);

  // 라벨이 바뀔 때 마다 실시간 검색
  useEffect(() => {
    updateQuery(createSearchQuery(labels));
  }, [labels]);

  // index 번 째 라벨을 제거하는 함수를 반환하는 함수
  const handleLabelClick =
    (index: number): (() => void) =>
    () => {
      setLabels((labels) => labels.filter((item, idx) => idx !== index));
    };

  // 사용자 입력 시 Word 상태 변경
  const handleWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWord(e.target.value);
  };

  // 엔터 키 입력 시 word 를 Label 로 등록하는 함수
  const handlePressedKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!isEnterKey(e.key) || word.length === 0) {
      return;
    }
    setLabels((labels) => [...labels, createLabel(word)]); // <- 여기서 어떻게 전처리를 한번 해주는게?
    setWord("");
  };

  return (
    <span className="search-form">
      {labels.map((label, index) => (
        <SearchLabel
          key={index}
          label={label}
          onClick={handleLabelClick(index)}
        />
      ))}
      <input
        type="text"
        className="search-form__input"
        placeholder="검색어를 입력해주세요."
        value={word}
        onChange={handleWordChange}
        onKeyUp={handlePressedKey}
      />
    </span>
  );
};

export default SearchForm;
