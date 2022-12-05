import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";

import { QUERY_KEYS } from "@/react-query/queryKeys";
import { fetchSearchHistory } from "@/apis/search";
import SearchHistoryView from "@/components/main/MainNav/NavContent/SearchContent/SearchHistoryView/SearchHistoryView";

import "./SearchContentBody.scss";

const SearchContentHistory = (): JSX.Element => {
  const { data } = useQuery([QUERY_KEYS.HISTORY], fetchSearchHistory, {
    suspense: true,
  });

  return (
    <div className="search-content__body">
      <div className="title">최근 검색어</div>
      <Suspense fallback={<div>로딩중..</div>}>
        {data?.map((history) => (
          <SearchHistoryView
            key={`${history.updatedAt}-history`}
            searchHistory={history}
          />
        ))}
      </Suspense>
    </div>
  );
};

export default SearchContentHistory;
