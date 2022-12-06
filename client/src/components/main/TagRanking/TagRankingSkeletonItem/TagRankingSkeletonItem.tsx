import React from "react";

import "./TagRankingSkeletonItem.scss";

interface TagRankingSkeletonItemProps {
  rank: number;
}

const TagRankingSkeletonItem = ({
  rank,
}: TagRankingSkeletonItemProps): JSX.Element => {
  return (
    <li className="tag-rank-skeleton-item">
      <span className="tag-rank-skeleton-item__rank">{rank}.</span>
      <div className="tag-rank-skeleton-item__content" />
    </li>
  );
};

export default TagRankingSkeletonItem;
