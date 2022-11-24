import React, { useContext } from "react";
import { PostContext } from "@/components/PostScroll/Post/Post";
import FollowButton from "@/components/PostScroll/Post/PostTitle/AuthorProfile/FollowButton/FollowButton";

const AuthorProfile = (): JSX.Element => {
  const { author } = useContext(PostContext);

  return (
    <div className="post__title__author-profile">
      <img
        className="post__title__author-profile--image"
        src={author.profileUrl}
      />
      <div className="post__title__author-profile--username">
        {author.nickname}
      </div>
      <FollowButton />
    </div>
  );
};

export default AuthorProfile;
