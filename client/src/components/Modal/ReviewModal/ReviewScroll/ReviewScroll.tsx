import React, { useMemo } from "react";
import useReviewInfiniteScroll from "@/hooks/useReviewInfiniteScroll";
import { ReviewInfo, ReviewPages } from "@/types/review";
import Review from "@/components/Modal/ReviewModal/ReviewContainer/ReviewScroll/Review/Review";
import ScrollLoader from "@/components/ScrollLoader/ScrollLoader";

interface ReviewScrollProps {
  postId: string;
}

const ReviewScroll = ({ postId }: ReviewScrollProps): JSX.Element => {
  const { data, onIntersect } = useReviewInfiniteScroll(postId);
  const reviewInfos = useMemo(
    (): ReviewInfo[] =>
      data?.pages.flatMap(
        (reviewScroll: ReviewPages) => reviewScroll.reviews
      ) ?? [],
    [data]
  );

  return (
    <ul className="review-list">
      {reviewInfos.map((reviewInfo: ReviewInfo) => (
        <Review key={reviewInfo.id} reviewInfo={reviewInfo} />
      ))}
      <ScrollLoader onIntersect={onIntersect} />
    </ul>
  );
};

export default ReviewScroll;
