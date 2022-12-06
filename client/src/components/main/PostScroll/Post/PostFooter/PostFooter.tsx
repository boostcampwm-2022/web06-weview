import React from "react";

import LikeButton from "@/components/main/PostScroll/Post/PostFooter/LeftBlockItems/LikeButton";
import ReportButton from "@/components/main/PostScroll/Post/PostFooter/LeftBlockItems/ReportButton";
import ReviewButton from "@/components/main/PostScroll/Post/PostFooter/LeftBlockItems/ReviewButton";
import ShareButton from "@/components/main/PostScroll/Post/PostFooter/LeftBlockItems/ShareButton";
import MoreButton from "@/components/main/PostScroll/Post/PostFooter/RightBlockItems/MoreButton";
import BookmarkButton from "@/components/main/PostScroll/Post/PostFooter/LeftBlockItems/BookmarkButton";

import "./PostFooter.scss";

const PostFooter = (): JSX.Element => {
  return (
    <div className="post__footer">
      <div className="post__footer__left-block">
        <LikeButton />
        <ReportButton />
        <ReviewButton />
        <ShareButton />
        <BookmarkButton />
      </div>
      <div className="post__footer__right-block">
        <MoreButton />
      </div>
    </div>
  );
};

export default PostFooter;
