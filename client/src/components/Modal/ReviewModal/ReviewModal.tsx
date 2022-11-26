import React from "react";
import ReviewScroll from "@/components/Modal/ReviewModal/ReviewScroll/ReviewScroll";
import CodeContainer from "@/components/Code/CodeContainer";

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
      <CodeContainer codeStore={{ code, language }} />
      <div className="review-modal__review-container">
        <ReviewScroll postId={postId} />
      </div>
    </div>
  );
};

export default ReviewModal;
