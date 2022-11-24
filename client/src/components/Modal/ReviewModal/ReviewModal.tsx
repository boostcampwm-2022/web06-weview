import React from "react";
import ReviewScroll from "@/components/Modal/ReviewModal/ReviewScroll/ReviewScroll";
import CodeViewer from "@/components/Code/CodeViewer";

interface ReviewModalProps {
  postId: string;
  code: string;
  language: string;
}

const ReviewModal = ({
  postId,
  code,
  language,
}: ReviewModalProps): JSX.Element => {
  return (
    <div className="review-modal">
      <CodeViewer code={code} language={language} />
      <ReviewScroll postId={postId} />
    </div>
  );
};

export default ReviewModal;
