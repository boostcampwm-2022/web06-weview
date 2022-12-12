import React, { useContext } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";
import TimeStamp from "@/components/commons/TimeStamp/TimeStamp";
import PostContent from "@/components/main/PostScroll/Post/PostBody/PostContent/PostContent";
import PostTags from "@/components/main/PostScroll/Post/PostBody/PostTags/PostTags";

import "./PostBody.scss";

const PostBody = (): JSX.Element => {
  const { title, content, tags, updatedAt } = useContext(PostContext);

  return (
    <div className="post__body">
      <div className="post__body__title">
        <div className="post__body__title--title">{title}</div>
        <TimeStamp
          updatedAt={updatedAt}
          className={"post__body__title--time-stamp"}
        />
      </div>
      <PostTags tags={tags} />
      <PostContent content={content} />
    </div>
  );
};

export default PostBody;
