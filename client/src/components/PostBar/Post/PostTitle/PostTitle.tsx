import React from "react";
import AuthorProfile from "@/components/PostBar/Post/PostTitle/AuthorProfile/AuthorProfile";
import TimeStamp from "@/components/PostBar/Post/PostTitle/TimeStamp/TimeStamp";

const PostTitle = (): JSX.Element => {
  return (
    <div className="post__title">
      <AuthorProfile />
      <TimeStamp />
    </div>
  );
};

export default PostTitle;
