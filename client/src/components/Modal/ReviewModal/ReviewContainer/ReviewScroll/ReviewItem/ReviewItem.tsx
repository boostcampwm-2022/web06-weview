import React from "react";
import { ReviewInfo } from "@/types/review";
import TimeStamp from "@/components/TimeStamp/TimeStamp";

const ReviewItem = ({ info }: { info: ReviewInfo }): JSX.Element => {
  return (
    <li className="review-item">
      <div className="review-item__reviewer-image">
        <img
          className="review-item__reviewer-image--item"
          src={info.reviewer.profileUrl}
        />
      </div>
      <div className="review-item__balloon">
        <div className="review-item__balloon__top">
          <span className="review-item__balloon__top--nickname">
            {info.reviewer.nickname}
          </span>
          <TimeStamp
            updatedAt={info.updatedAt}
            className={"review-item__balloon__top--time"}
          />
        </div>
        <p
          className="review-item__content"
          dangerouslySetInnerHTML={{ __html: info.content }}
        ></p>
      </div>
    </li>
  );
};

export default ReviewItem;
