import React from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./TagRankItem.scss";

interface PopularTagBoxProps {
  tagInfo: {
    name: string;
    prev: number;
    nowRank: number;
  };
  className: "tag-rank-item" | "tag-rank-item highlight-tag";
}

const TagRankItem = ({
  tagInfo,
  className,
}: PopularTagBoxProps): JSX.Element => {
  return (
    <li className={className}>
      <span className="tag-rank-item__rank">{tagInfo.nowRank}.</span>
      <span className="tag-rank-item__name">{tagInfo.name}</span>
      {tagInfo.prev === tagInfo.nowRank && (
        <HorizontalRuleIcon className="tag-rank-item__icon--equal" />
      )}
      {tagInfo.prev < tagInfo.nowRank && (
        <ArrowDownwardIcon className="tag-rank-item__icon--down" />
      )}
      {tagInfo.prev > tagInfo.nowRank && (
        <ArrowUpwardIcon className="tag-rank-item__icon--up" />
      )}
    </li>
  );
};

export default TagRankItem;
