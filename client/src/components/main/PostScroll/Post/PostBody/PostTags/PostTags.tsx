import React, { useCallback } from "react";

import SearchLabel from "@/components/commons/SearchLabel/SearchLabel";
import { createLabel } from "@/utils/label";
import useSearch from "@/hooks/useSearch";
import { Label } from "@/types/search";

import "./PostTags.scss";

interface PostTagsProps {
  tags: string[];
}

const PostTags = ({ tags }: PostTagsProps): JSX.Element => {
  const { loadLabels, handleSubmit } = useSearch();

  const handleClickLabel = useCallback(
    (label: Label) => {
      handleSubmit([label]);
    },
    [loadLabels, handleSubmit]
  );

  return (
    <div className="post__body--tags">
      {tags.map((tag) => (
        <SearchLabel
          key={tag}
          label={createLabel(`#${tag}`)}
          onClickCallback={handleClickLabel}
        />
      ))}
    </div>
  );
};

export default PostTags;
