import React from "react";

import ReviewScroll from "@/components/main/Modal/ReviewModal/ReviewScroll/ReviewScroll";
import CodeViewer from "@/components/main/CodeViewer/CodeViewer";
import { getLineCount } from "@/utils/code";
import useViewerScroll from "@/hooks/useViewerScroll";

import "./ReviewModal.scss";

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
  const { lineRef, preRef, handleScrollChange } = useViewerScroll();

  return (
    <div className="review-modal">
      <div className="review-modal__code">
        <div className="review-modal__code--lines" ref={lineRef}>
          {Array.from(Array(getLineCount(code) + 1).keys())
            .slice(1)
            .join("\n")}
        </div>
        <CodeViewer
          code={code}
          language={language}
          className={"review-modal__code--view"}
          preRef={preRef}
          handleScrollChange={handleScrollChange}
        />
      </div>
      <div className="review-modal__review-container">
        <ReviewScroll postId={postId} />
      </div>
    </div>
  );
};

export default ReviewModal;
