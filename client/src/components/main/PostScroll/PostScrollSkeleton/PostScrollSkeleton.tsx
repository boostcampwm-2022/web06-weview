import React from "react";

import "./PostScrollSkeleton.scss";

const PostScrollSkeleton = (): JSX.Element => {
  return (
    <div className="post-skeleton">
      <div className="post-skeleton__title">
        <span className="post-skeleton__title__author-profile">
          <span className="post-skeleton__title__author-profile__image"></span>
          <span className="post-skeleton__title__author-profile__username"></span>
        </span>
        <span className="post-skeleton__title__code-info"></span>
      </div>
      <div className="post-skeleton__image-slider"></div>
      <div className="post-skeleton__body">
        <div className="post-skeleton__body--title"></div>
        <div className="post-skeleton__body--content"></div>
      </div>
      <div className="post-skeleton__footer"></div>
    </div>
  );
};

export default PostScrollSkeleton;
