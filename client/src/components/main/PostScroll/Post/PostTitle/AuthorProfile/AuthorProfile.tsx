import React, { useContext } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";

import "./AuthorProfile.scss";

const AuthorProfile = (): JSX.Element => {
  const { author } = useContext(PostContext);

  return (
    <div className="post__title__author-profile">
      <img
        className="post__title__author-profile__image"
        src={author.profileUrl}
      />
      <div className="post__title__author-profile__username">
        {author.nickname}
      </div>
    </div>
  );
};

export default AuthorProfile;
