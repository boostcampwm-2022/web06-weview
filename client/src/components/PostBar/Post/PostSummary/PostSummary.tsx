import React from "react";
import CodeInfo from "@/components/PostBar/Post/PostSummary/CodeInfo/CodeInfo";

const PostSummary = (): JSX.Element => {
  return (
    <div className="post__info">
      <div className="post__info__type-toggle">
        <button className="post__info__type-toggle--view">View</button>
        <button className="post__info__type-toggle--code">Code</button>
      </div>
      <CodeInfo />
    </div>
  );
};

export default PostSummary;
