import React from "react";

import { SearchHistory } from "@/types/search";

interface SearchHistoryViewProps {
  searchHistory: SearchHistory;
}

const SearchHistoryView = ({
  searchHistory,
}: SearchHistoryViewProps): JSX.Element => {
  return <div>히스토리</div>;
};

export default SearchHistoryView;
