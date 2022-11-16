import React, { useContext } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";

const PostBody = (): JSX.Element => {
  const { title, content } = useContext(PostContext);

  return (
    <div className="post__body">
      <div className="post__body--title">{title}</div>
      <div className="post__body--content">{content}</div>
    </div>
  );
};

export default PostBody;
