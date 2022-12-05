import React from "react";
import { useQuery } from "@tanstack/react-query";
import RemoveIcon from "@mui/icons-material/Remove";

import { Label, SearchHistory } from "@/types/search";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import { fetchSearchHistory } from "@/apis/search";
import { labelsFrom } from "@/utils/label";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";

import "./SearchHistoryView.scss";

interface SearchHistoryItemProps {
  history: SearchHistory;
}

const SearchHistoryItem = ({
  history,
}: SearchHistoryItemProps): JSX.Element => {
  const labels = labelsFrom(history);
  return (
    <div className="search-content__body__histories--item">
      <span className="search-content__body__histories--item--labels">
        {labels.map((label: Label) => (
          <SearchLabel
            key={`${label.type}-${label.value}-filtered`}
            label={label}
          />
        ))}
      </span>
      <RemoveIcon className="search-content__body__histories--item--remove" />
    </div>
  );
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
