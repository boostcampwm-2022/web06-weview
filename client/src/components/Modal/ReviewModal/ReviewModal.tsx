import React from "react";
import ReviewScroll from "@/components/Modal/ReviewModal/ReviewScroll/ReviewScroll";
import ReviewForm from "@/components/Modal/ReviewModal/ReviewForm/ReviewForm";
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
      <div className="review-modal__review-container">
        <ReviewScroll postId={postId} />
        <ReviewForm postId={postId} />
      </div>
    </div>
  );
};

export default ReviewModal;
