import React, { useMemo } from "react";
import useReviewInfiniteScroll from "@/hooks/useReviewInfiniteScroll";
import { ReviewInfo, ReviewPages } from "@/types/review";
import ReviewItem from "@/components/Modal/ReviewModal/ReviewContainer/ReviewScroll/ReviewItem/ReviewItem";
import PostLoader from "@/components/PostBar/PostLoader/PostLoader";

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
        <ReviewItem key={reviewInfo.id} info={reviewInfo} />
      ))}
      <PostLoader onIntersect={onIntersect} />
    </ul>
  );
};

export default ReviewScroll;
