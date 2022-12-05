import React from "react";

import SearchContentHeader from "@/components/main/MainNav/NavContent/SearchContent/SearchContentHeader/SearchContentHeader";
import SearchContentHistory from "@/components/main/MainNav/NavContent/SearchContent/SearchContentBody/SearchContentHistory";
import SearchContentRecommend from "@/components/main/MainNav/NavContent/SearchContent/SearchContentBody/SearchContentRecommend";

import "./SearchContent.scss";

const SearchContent = (): JSX.Element => {
  return (
    <div className="search-content">
      <SearchContentHeader />
      <SearchContentHistory />
      <SearchContentRecommend />
    </div>
  );
};

export default SearchContent;
