import React from "react";
import CodeEditor from "@/components/CodeEditor/CodeEditor";

interface ReviewModalProps {
  postId: string;
  code: string;
}

const ReviewModal = ({ postId, code }: ReviewModalProps): JSX.Element => {
  return (
    <div className="review-modal">
      <CodeEditor />
      <div className="review-modal__reviews">
        postId: {postId} code: {code}
      </div>
    </div>
  );
};

export default ReviewModal;
