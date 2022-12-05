// SearchContent 에서 고정되어 있는 부분
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

import useLabel from "@/hooks/useLabel";
import { Label } from "@/types/search";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";

import "./SearchContentHeader.scss";

const SearchContentHeader = (): JSX.Element => {
  const {
    word,
    labels,
    handleWordChange,
    handleWordKeyUp,
    removeLabel,
    handleSubmit,
  } = useLabel();

  return (
    <>
      <div className="content-title">검색</div>
      <div className="search-content__form">
        <input
          className="search-content__form__input"
          type="text"
          value={word}
          placeholder="WeView 검색"
          onChange={handleWordChange}
          onKeyUp={handleWordKeyUp}
        />
        <SearchIcon
          className="search-content__form__submit"
          onClick={handleSubmit}
        />
      </div>
      <div className="title">검색 필터</div>
      <div className="search-content__labels">
        {labels.map((label: Label) => (
          <SearchLabel
            key={`${label.type}-${label.value}-filtered`}
            label={label}
            onClickCallback={removeLabel}
          />
        ))}
      </div>
    </>
  );
};

export default SearchContentHeader;
