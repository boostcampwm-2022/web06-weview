import React from "react";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import ReviewScroll from "@/components/Modal/ReviewModal/ReviewScroll/ReviewScroll";
import ReviewForm from "@/components/Modal/ReviewModal/ReviewForm/ReviewForm";

interface ReviewModalProps {
  postId: string;
  code: string;
}

const ReviewModal = ({ postId, code }: ReviewModalProps): JSX.Element => {
  return (
    <div className="review-modal">
      <CodeEditor />
      <div className="review-modal__review-container">
        <ReviewScroll postId={postId} />
        <ReviewForm postId={postId} />
      </div>
    </div>
  );
};

export default ReviewModal;
