import React, { useMemo } from "react";
import useReviewInfiniteScroll from "@/hooks/useReviewInfiniteScroll";
import { ReviewInfo, ReviewScroll } from "@/types/review";
import PostLoader from "@/components/PostBar/PostLoader/PostLoader";

interface ReviewContainerProps {
  postId: string;
}

const ReviewContainer = ({ postId }: ReviewContainerProps): JSX.Element => {
  const { data, onIntersect } = useReviewInfiniteScroll(postId);
  const reviewInfos = useMemo(
    (): ReviewInfo[] =>
      data?.pages.flatMap(
        (reviewScroll: ReviewScroll) => reviewScroll.reviews
      ) ?? [],
    [data]
  );

  return (
    <div className="review-modal__review-container">
      {reviewInfos.map((reviewInfo: ReviewInfo) => (
        <div key={reviewInfo.id}>hi</div>
      ))}
      <PostLoader onIntersect={onIntersect} />
    </div>
  );
};

export default ReviewContainer;
