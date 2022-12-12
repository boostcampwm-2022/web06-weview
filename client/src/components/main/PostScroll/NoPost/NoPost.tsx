import React from "react";

import { recommendKeyword } from "@/components/main/MainNav/NavContent/SearchContent/SearchContentBody/SearchContentRecommend";
import { Label } from "@/types/search";
import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";
import useLabel from "@/hooks/useLabel";

import "./NoPost.scss";

const NoPost = (): JSX.Element => {
  const { loadLabels, handleSubmit, insertLabel } = useLabel();

  return (
    <div className="no-post">
      <img
        className="no-post__logo"
        alt="WeView Logo"
        onClick={() => {
          loadLabels([]);
          handleSubmit();
        }}
      />
      <h3 className="no-post__heading">해당 조건의 포스트가 없습니다</h3>
      <div className="no-post__recommend">
        <h4 className="no-post__recommend--heading">추천 검색어</h4>
        <div className="no-post__recommend--label">
          {recommendKeyword.map((label: Label) => (
            <SearchLabel
              key={`${label.type}-${label.value}-recommend`}
              label={label}
              onClickCallback={insertLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoPost;
