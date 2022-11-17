import React, { useContext } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";
import FollowButton from "@/components/PostBar/Post/PostTitle/AuthorProfile/FollowButton/FollowButton";

const AuthorProfile = (): JSX.Element => {
  const { user } = useContext(PostContext);

  return (
    <div className="post__title__author-profile">
      <img
        className="post__title__author-profile--image"
        src={user.profileUrl}
      />
      <div className="post__title__author-profile--username">
        {user.username}
      </div>
      <FollowButton />
    </div>
  );
};

export default AuthorProfile;
