import React from "react";

import TagRankItem from "@/components/main/TagRanking/TagRankingItem/TagRankingItem";
import useRanking from "@/hooks/useRanking";

import "./TagRanking.scss";

const TagRanking = (): JSX.Element => {
  const { rankingData, isStaggering } = useRanking();

  return (
    <section className={isStaggering ? "tag-rank stagger" : " tag-rank"}>
      <h3 className="tag-rank__header">인기 태그</h3>
      <ul className="tag-rank__list">
        {rankingData.map((tag, idx) => (
          <TagRankItem
            key={tag.name}
            tagInfo={{ ...tag, nowRank: idx + 1 }}
            className="tag-rank-item"
          />
        ))}
      </ul>
    </section>
  );
};

export default TagRanking;
