import React, { useCallback } from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import useSearchStore from "@/store/useSearchStore";

import "./TagRankingItem.scss";

interface PopularTagBoxProps {
  tagInfo: {
    name: string;
    prev: number;
    nowRank: number;
  };
}

const TagRankingItem = ({ tagInfo }: PopularTagBoxProps): JSX.Element => {
  const [updateQuery] = useSearchStore((state) => [state.updateQuery]);
  const handleItemClick = useCallback((): void => {
    updateQuery({ tags: [tagInfo.name], lastId: "-1" });
  }, []);

  return (
    <li onClick={handleItemClick} className="tag-rank-item">
      <span className="tag-rank-item__rank">{tagInfo.nowRank}.</span>
      <span className="tag-rank-item__name">{tagInfo.name}</span>
      {/* 순위에 새로 들어온 태그 */}
      {tagInfo.prev === 0 && <i className="tag-rank-item__icon--new">new</i>}
      {/* 동순위 */}
      {tagInfo.prev === tagInfo.nowRank && (
        <HorizontalRuleIcon className="tag-rank-item__icon--equal" />
      )}
      {/* 순위 낮아짐 */}
      {tagInfo.prev !== 0 && tagInfo.prev < tagInfo.nowRank && (
        <ArrowDownwardIcon className="tag-rank-item__icon--down" />
      )}
      {/* 순위 높아짐 */}
      {tagInfo.prev > tagInfo.nowRank && (
        <ArrowUpwardIcon className="tag-rank-item__icon--up" />
      )}
    </li>
  );
};

export default TagRankingItem;
