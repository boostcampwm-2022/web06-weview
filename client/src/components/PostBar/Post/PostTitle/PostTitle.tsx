import React from "react";
import AuthorProfile from "@/components/PostBar/Post/PostTitle/AuthorProfile/AuthorProfile";
import CodeInfo from "@/components/PostBar/Post/PostTitle/CodeInfo/CodeInfo";

const PostTitle = (): JSX.Element => {
  return (
    <div className="post__title">
      <AuthorProfile />
      <CodeInfo />
    </div>
  );
};

export default PostTitle;
