import React from "react";

import TagRankingItem from "@/components/main/TagRanking/TagRankingItem/TagRankingItem";
import useRanking from "@/hooks/useRanking";

import TagRankingSkeleton from "./TagRankingSkeletonItem/TagRankingSkeletonItem";

import "./TagRanking.scss";

const TagRanking = (): JSX.Element => {
  const { rankingData, isStaggering } = useRanking();

  if (rankingData.length === 0) {
    return (
      <section className="tag-rank">
        <h3 className="tag-rank__header">인기 태그</h3>
        <ul className="tag-rank__list">
          {rankingData.length === 0 &&
            Array.from({ length: 10 }).map((_, idx) => (
              <TagRankingSkeleton key={idx} rank={idx + 1} />
            ))}
        </ul>
      </section>
    );
  }

  return (
    <section className={isStaggering ? "tag-rank stagger" : "tag-rank"}>
      <h3 className="tag-rank__header">인기 태그</h3>
      <ul className="tag-rank__list">
        {rankingData.map((tag, idx) => (
          <TagRankingItem
            key={tag.name}
            tagInfo={{ ...tag, nowRank: idx + 1 }}
          />
        ))}
      </ul>
    </section>
  );
};

export default TagRanking;
