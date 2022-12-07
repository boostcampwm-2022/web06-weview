import React from "react";
import { useQuery } from "@tanstack/react-query";
import RemoveIcon from "@mui/icons-material/Remove";

import { Label, SearchHistory } from "@/types/search";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import { deleteSearchHistory, fetchSearchHistory } from "@/apis/search";
import { labelsFrom } from "@/utils/label";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";
import useLabel from "@/hooks/useLabel";
import { queryClient } from "@/react-query/queryClient";

import "./SearchHistoryView.scss";

interface SearchHistoryItemProps {
  history: SearchHistory;
  onClick: Function;
}

const SearchHistoryItem = ({
  history,
  onClick,
}: SearchHistoryItemProps): JSX.Element => {
  const labels = labelsFrom(history);
  const handleItemDelete = (): void => {
    void (async () => {
      await deleteSearchHistory(history.id);
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.HISTORY],
        type: "active",
      });
    })();
  };

  return (
    <div className="search-content__body__histories--item">
      <span
        className="search-content__body__histories--item--labels"
        onClick={() => onClick(labels)}
      >
        {labels.map((label: Label) => (
          <SearchLabel
            key={`${label.type}-${label.value}-filtered`}
            label={label}
          />
        ))}
      </span>
      <RemoveIcon
        className="search-content__body__histories--item--remove"
        onClick={handleItemDelete}
      />
    </div>
  );
};

const SearchHistoryView = (): JSX.Element => {
  const { loadLabels } = useLabel();
  const { data } = useQuery<SearchHistory[] | undefined>(
    [QUERY_KEYS.HISTORY],
    fetchSearchHistory,
    {
      suspense: true,
      refetchOnMount: true, // 렌더 시 업데이트
      staleTime: 2 * 1000, // 2초
    }
  );

  return (
    <div className="search-content__body__histories">
      {data?.map((history) => (
        <SearchHistoryItem
          key={history.id}
          history={history}
          onClick={loadLabels}
        />
      ))}
    </div>
  );
};

export default SearchHistoryView;
