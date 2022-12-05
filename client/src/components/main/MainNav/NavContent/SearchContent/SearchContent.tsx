import React from "react";

import SearchContentHeader from "@/components/main/MainNav/NavContent/SearchContent/SearchContentHeader/SearchContentHeader";
import SearchContentHistory from "@/components/main/MainNav/NavContent/SearchContent/SearchContentBody/SearchContentHistory";
import SearchContentRecommend from "@/components/main/MainNav/NavContent/SearchContent/SearchContentBody/SearchContentRecommend";
import useAuth from "@/hooks/useAuth";

import "./SearchContent.scss";

const SearchContent = (): JSX.Element => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="search-content">
      <SearchContentHeader />
      {isLoggedIn && <SearchContentHistory />}
      <SearchContentRecommend />
    </div>
  );
};

export default SearchContent;
