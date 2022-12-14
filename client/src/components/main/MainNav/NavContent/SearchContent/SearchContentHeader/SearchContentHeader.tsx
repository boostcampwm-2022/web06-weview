// SearchContent 에서 고정되어 있는 부분
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import ArrowDropDownCircleSharpIcon from "@mui/icons-material/ArrowDropDownCircleSharp";

import useSearch from "@/hooks/useSearch";
import { Label } from "@/types/search";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";
import { LABEL_NAME } from "@/constants/label";

import DetailSearchForm from "./DetailSearchForm/DetailSearchForm";

import "./SearchContentHeader.scss";

const SearchContentHeader = (): JSX.Element => {
  const {
    word,
    totalLabels,
    handleWordChange,
    handleWordKeyUp,
    removeLabel,
    handleSearchSubmit,
  } = useSearch(LABEL_NAME.DETAILS);
  const [isDetailOpened, setIsDetailOpened] = useState(false);

  return (
    <>
      <div className="content-title">검색</div>
      <div className="search-content__form">
        <input
          className="search-content__form__input"
          type="text"
          value={word}
          placeholder="검색어를 입력해주세요."
          onChange={handleWordChange}
          onKeyUp={handleWordKeyUp}
        />
        <SearchIcon
          className="search-content__form__submit"
          onClick={handleSearchSubmit}
        />
      </div>
      <div className="search-content__filter__header">
        <div className="search-content__filter__header--title">검색 필터</div>
        <ArrowDropDownCircleSharpIcon
          className="search-content__filter__header--btn"
          onClick={() => setIsDetailOpened((isDetailOpened) => !isDetailOpened)}
        />
      </div>
      <div className="search-content__labels">
        {totalLabels.map((label: Label) => (
          <SearchLabel
            key={`${label.type}-${label.value}-filtered`}
            label={label}
            onClickCallback={removeLabel}
          />
        ))}
      </div>
      {isDetailOpened && <DetailSearchForm />}
    </>
  );
};

export default SearchContentHeader;
