import React, { useContext } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";
import useSearchStore from "@/store/useSearchStore";

import "./AuthorProfile.scss";

const AuthorProfile = (): JSX.Element => {
  const { author } = useContext(PostContext);
  const searchAuthorFilter = useSearchStore(
    (state) => state.searchAuthorFilter
  );

  return (
    <div className="post__title__author-profile">
      <img
        className="post__title__author-profile__image"
        src={author.profileUrl}
        onClick={() => searchAuthorFilter({ userId: author.id })}
      />
      <div
        className="post__title__author-profile__username"
        onClick={() => searchAuthorFilter({ userId: author.id })}
      >
        {author.nickname}
      </div>
    </div>
  );
};

export default AuthorProfile;
