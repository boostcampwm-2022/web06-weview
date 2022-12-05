import React from "react";
import { useQuery } from "@tanstack/react-query";

import { SearchHistory } from "@/types/search";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import { fetchSearchHistory } from "@/apis/search";

interface SearchHistoryItemProps {
  history: SearchHistory;
}

const SearchHistoryItem = ({
  history,
}: SearchHistoryItemProps): JSX.Element => {
  return <div className="search-content__body__histories--item">아이템</div>;
};

const SearchHistoryView = (): JSX.Element => {
  const { data } = useQuery<SearchHistory[] | undefined>(
    [QUERY_KEYS.HISTORY],
    fetchSearchHistory,
    {
      suspense: true,
    }
  );

  return (
    <div className="search-content__body__histories">
      {data?.map((history) => (
        <SearchHistoryItem key={history.updatedAt} history={history} />
      ))}
    </div>
  );
};

export default SearchHistoryView;
