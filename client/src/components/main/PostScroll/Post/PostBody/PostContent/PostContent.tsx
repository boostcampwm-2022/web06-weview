import React, { MouseEventHandler, useState } from "react";

import {
  MAXIMUM_CONTENT_ENTER,
  MAXIMUM_CONTENT_LENGTH,
} from "@/constants/code";

import "./PostContent.scss";

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps): JSX.Element => {
  const contentSlice = content.slice(0, MAXIMUM_CONTENT_LENGTH);
  const contentSliceSplit = contentSlice.split("\n");
  const preview = Array.from(
    { length: MAXIMUM_CONTENT_ENTER },
    (_, index) => contentSliceSplit[index] ?? ""
  ).join("\n");

  const [isOpened, setIsOpened] = useState(
    contentSlice.length < MAXIMUM_CONTENT_LENGTH && // 더보기로 나누지 않을 만큼 내용이 충분히 짧음
      contentSliceSplit.length - 1 < MAXIMUM_CONTENT_ENTER // 더보기로 나누지 않을 만큼 개행이 적음
  );

  const handleOpenContent: MouseEventHandler = () => {
    if (isOpened) {
      return;
    }
    setIsOpened(true);
  };

  return (
    <div className="post__body--content">
      {isOpened ? content : preview}
      {!isOpened && (
        <p className="post__body--content--more" onClick={handleOpenContent}>
          더보기..
        </p>
      )}
    </div>
  );
};

export default PostContent;
