import React, { useContext } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";

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
      <button className="post__title__author-profile--follow-btn">
        팔로우
      </button>
    </div>
  );
};

export default AuthorProfile;
