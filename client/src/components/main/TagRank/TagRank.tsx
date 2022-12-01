import React, { useEffect, useState } from "react";

import TagRankItem from "@/components/main/TagRank/TagRankItem/TagRankItem";

import "./TagRank.scss";

const tags = [
  { name: "javascript", prev: 2 },
  { name: "java", prev: 3 },
  { name: "sort", prev: 1 },
  { name: "algorithm", prev: 12 },
  { name: "coding-testzxcvzxvxzcvzxvzxc", prev: 5 },
  { name: "quick-sort", prev: 6 },
  { name: "sort-array", prev: 9 },
  { name: "promise", prev: 8 },
  { name: "layout", prev: 7 },
  { name: "kotlin", prev: 13 },
];

const TagRank = (): JSX.Element => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setHighlightedIndex((idx) => idx + 1);
      if (highlightedIndex === tags.length - 1) {
        setHighlightedIndex(0);
      }
    }, 3000);
    return () => clearInterval(id);
  }, [highlightedIndex]);

  return (
    <section className="tag-rank">
      <h3 className="tag-rank__header">인기 태그</h3>
      <ul className="tag-rank__list">
        {tags.map((tag, idx) => (
          <TagRankItem
            key={tag.name}
            tagInfo={{ ...tag, nowRank: idx + 1 }}
            className={
              idx === highlightedIndex
                ? "tag-rank-item highlight-tag"
                : "tag-rank-item"
            }
          />
        ))}
      </ul>
    </section>
  );
};

export default TagRank;
