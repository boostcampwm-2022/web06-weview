import React from "react";
import AuthorProfile from "@/components/main/PostScroll/Post/PostTitle/AuthorProfile/AuthorProfile";
import CodeInfo from "@/components/main/PostScroll/Post/PostTitle/CodeInfo/CodeInfo";
import "./PostTitle.scss";

const PostTitle = (): JSX.Element => {
  return (
    <div className="post__title">
      <AuthorProfile />
      <CodeInfo />
    </div>
  );
};

export default PostTitle;
