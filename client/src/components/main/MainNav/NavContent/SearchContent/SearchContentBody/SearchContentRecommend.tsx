import React from "react";

import useLabel from "@/hooks/useLabel";
import { Label } from "@/types/search";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";

import "./SearchContentBody.scss";

const SearchContentRecommend = (): JSX.Element => {
  const { insertLabel } = useLabel();

  // TODO : ReactQuery 로 서버 상태로 받아오기
  const recommendKeyword: Label[] = [
    {
      type: "details",
      value: "부스트캠프",
    },
    {
      type: "tags",
      value: "Javascript",
    },
    {
      type: "tags",
      value: "알고리즘",
    },
  ];

  return (
    <div className="search-content__body">
      <div className="title">추천 검색어</div>
      <div className="search-content__body__labels">
        {recommendKeyword.map((label: Label) => (
          <SearchLabel
            key={`${label.type}-${label.value}-recommend`}
            label={label}
            onClickCallback={insertLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchContentRecommend;
