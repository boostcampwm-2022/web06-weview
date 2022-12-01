import React, { Dispatch, SetStateAction, useState } from "react";

import useLabel from "@/hooks/useLabel";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";
import { Label } from "@/types/search";

import "./SearchContent.scss";

// SearchContent 에서 고정되어 있는 부분
const SearchContentHeader = ({
  setFocus,
}: {
  setFocus: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { word, labels, handleWordChange, handleWordKeyUp, removeLabel } =
    useLabel();

  return (
    <>
      <div className="content-title">검색</div>
      <input
        className="search-content__input"
        type="text"
        value={word}
        placeholder="WeView 검색"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={handleWordChange}
        onKeyUp={handleWordKeyUp}
      />
      <div className="title">검색 필터</div>
      <div className="search-content__labels">
        {labels.map((label: Label) => (
          <SearchLabel
            key={`${label.type}-${label.value}-filtered`}
            label={label}
            onClickCallback={() => removeLabel(label)}
          />
        ))}
      </div>
    </>
  );
};

// Header 의 Input 이 Focus 일 때 보여줄 부분
const SearchContentFocus = (): JSX.Element => {
  return (
    <div className="search-content__body focus">
      <div className="title">최근 검색어</div>
    </div>
  );
};

// Header 의 Input 이 Focus 가 아닐 때 보여줄 부분
const SearchContentBlur = (): JSX.Element => {
  const { insertLabel } = useLabel();

  // TODO : ReactQuery 로 서버 상태로 받아오기
  const recommendKeyword: Label[] = [
    {
      type: "detail",
      value: "부스트캠프",
    },
    {
      type: "tag",
      value: "Javascript",
    },
    {
      type: "tag",
      value: "알고리즘",
    },
  ];

  return (
    <div className="search-content__body blur">
      <div className="title">추천 검색어</div>
      <div className="search-content__body__labels">
        {recommendKeyword.map((label: Label) => (
          <SearchLabel
            key={`${label.type}-${label.value}-recommend`}
            label={label}
            onClickCallback={() => insertLabel(label)}
          />
        ))}
      </div>
    </div>
  );
};

const SearchContent = (): JSX.Element => {
  const [isInputFocus, setIsInputFocused] = useState(false);

  return (
    <div className="search-content">
      <SearchContentHeader setFocus={setIsInputFocused} />
      {isInputFocus ? <SearchContentFocus /> : <SearchContentBlur />}
    </div>
  );
};

export default SearchContent;
