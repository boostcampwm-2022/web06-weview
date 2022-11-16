import React from "react";
import LikeButton from "@/components/PostBar/Post/PostFooter/LikeButton/LikeButton";
import ReportButton from "@/components/PostBar/Post/PostFooter/ReportButton/ReportButton";
import ReviewButton from "@/components/PostBar/Post/PostFooter/ReviewButton/ReviewButton";
import ShareButton from "@/components/PostBar/Post/PostFooter/ShareButton/ShareButton";
import MoreButton from "@/components/PostBar/Post/PostFooter/MoreButton/MoreButton";

const PostFooter = (): JSX.Element => {
  return (
    <div className="post__footer">
      <div className="post__footer__left-block">
        <LikeButton />
        <ReportButton />
        <ReviewButton />
        <ShareButton />
      </div>
      <div className="post__footer__right-block">
        <MoreButton />
      </div>
    </div>
  );
};

export default PostFooter;
