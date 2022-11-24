import React, { useMemo } from "react";
import useReviewInfiniteScroll from "@/hooks/useReviewInfiniteScroll";
import { ReviewInfo, ReviewPages } from "@/types/review";
import Review from "@/components/Modal/ReviewModal/ReviewScroll/Review/Review";
import ScrollLoader from "@/components/ScrollLoader/ScrollLoader";
import ReviewForm from "@/components/Modal/ReviewModal/ReviewScroll/ReviewForm/ReviewForm";

interface ReviewScrollProps {
  postId: string;
}

const ReviewScroll = ({ postId }: ReviewScrollProps): JSX.Element => {
  const { data, onIntersect, refetch } = useReviewInfiniteScroll(postId);
  const reviewInfos = useMemo(
    (): ReviewInfo[] =>
      data?.pages.flatMap(
        (reviewScroll: ReviewPages) => reviewScroll.reviews
      ) ?? [],
    [data]
  );

  return (
    <div className="review-modal__review-container">
      <ul className="review-list">
        {reviewInfos.map((reviewInfo: ReviewInfo) => (
          <Review key={reviewInfo.id} reviewInfo={reviewInfo} />
        ))}
        <ScrollLoader onIntersect={onIntersect} spinner={false} />
      </ul>
      <ReviewForm postId={postId} refetch={refetch} />
    </div>
  );
};

export default ReviewScroll;
