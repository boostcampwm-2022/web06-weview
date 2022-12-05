import React, { Suspense } from "react";

import SearchHistoryView from "@/components/main/MainNav/NavContent/SearchContent/SearchHistoryView/SearchHistoryView";
import LoadingSpinner from "@/components/commons/LoadingSpinner/LoadingSpinner";

import "./SearchContentBody.scss";

const SearchContentHistory = (): JSX.Element => {
  return (
    <div className="search-content__body">
      <div className="title">최근 검색어</div>
      <Suspense
        fallback={
          <LoadingSpinner
            className={"search-content__body--loading"}
            small={true}
          />
        }
      >
        <SearchHistoryView />
      </Suspense>
    </div>
  );
};

export default SearchContentHistory;
