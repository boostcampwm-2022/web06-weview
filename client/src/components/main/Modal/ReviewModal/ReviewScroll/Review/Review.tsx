import React from "react";

import TimeStamp from "@/components/commons/TimeStamp/TimeStamp";
import { ReviewInfo } from "@/types/review";

import "./Review.scss";

interface ReviewProps {
  reviewInfo: ReviewInfo;
}

const Review = ({ reviewInfo }: ReviewProps): JSX.Element => {
  return (
    <li className="review">
      <div className="review__reviewer-image">
        <img
          className="review__reviewer-image--item"
          src={reviewInfo.reviewer.profileUrl}
        />
      </div>
      <div className="review__balloon">
        <div className="review__balloon__top">
          <span className="review__balloon__top--nickname">
            {reviewInfo.reviewer.nickname}
          </span>
          <TimeStamp
            updatedAt={reviewInfo.updatedAt}
            className={"review__balloon__top--time"}
          />
        </div>
        <p
          className="review__balloon__content"
          dangerouslySetInnerHTML={{ __html: reviewInfo.content }}
        ></p>
      </div>
    </li>
  );
};

export default Review;
