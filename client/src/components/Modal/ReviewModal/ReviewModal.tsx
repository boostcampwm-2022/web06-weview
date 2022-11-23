import React from "react";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import ReviewContainer from "@/components/Modal/ReviewModal/ReviewContainer/ReviewContainer";

interface ReviewModalProps {
  postId: string;
  code: string;
}

const ReviewModal = ({ postId, code }: ReviewModalProps): JSX.Element => {
  return (
    <div className="review-modal">
      <CodeEditor />
      <ReviewContainer postId={postId} />
    </div>
  );
};

export default ReviewModal;
