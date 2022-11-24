import React from "react";
import ReviewScroll from "@/components/Modal/ReviewModal/ReviewContainer/ReviewScroll/ReviewScroll";

interface ReviewContainerProps {
  postId: string;
}

const ReviewContainer = ({ postId }: ReviewContainerProps): JSX.Element => {
  return (
    <div className="review-modal__review-container">
      <ReviewScroll postId={postId} />
    </div>
  );
};

export default ReviewContainer;
