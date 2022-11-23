import React, { useContext } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";
import TimeStamp from "@/components/PostBar/Post/PostBody/TimeStamp/TimeStamp";

const PostBody = (): JSX.Element => {
  const { title, content } = useContext(PostContext);

  return (
    <div className="post__body">
      <div className="post__body__title">
        <div className="post__body__title--title">{title}</div>
        <TimeStamp />
      </div>
      <div className="post__body--content">{content}</div>
    </div>
  );
};

export default PostBody;
