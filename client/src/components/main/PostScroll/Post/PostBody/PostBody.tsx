import React, { MouseEventHandler, useContext, useState } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";
import TimeStamp from "@/components/commons/TimeStamp/TimeStamp";
import {
  MAXIMUM_CONTENT_ENTER,
  MAXIMUM_CONTENT_LENGTH,
} from "@/constants/code";

import "./PostBody.scss";

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps): JSX.Element => {
  const contentSlice = content.slice(0, MAXIMUM_CONTENT_LENGTH);
  const contentSliceEnterCount = contentSlice.split("\n").length - 1;

  const [isOpened, setIsOpened] = useState(
    contentSlice.length < MAXIMUM_CONTENT_LENGTH && // 더보기로 나누지 않을 만큼 내용이 충분히 짧음
      contentSliceEnterCount < MAXIMUM_CONTENT_ENTER // 더보기로 나누지 않을 만큼 개행이 적음
  );

  const handleOpenContent: MouseEventHandler = () => {
    if (isOpened) {
      return;
    }
    setIsOpened(true);
  };

  return (
    <div className="post__body--content">
      {isOpened ? content : content.slice(0, MAXIMUM_CONTENT_LENGTH)}
      {!isOpened && (
        <p className="post__body--content--more" onClick={handleOpenContent}>
          더보기..
        </p>
      )}
    </div>
  );
};

const PostBody = (): JSX.Element => {
  const { title, content, updatedAt } = useContext(PostContext);

  return (
    <div className="post__body">
      <div className="post__body__title">
        <div className="post__body__title--title">{title}</div>
        <TimeStamp
          updatedAt={updatedAt}
          className={"post__body__title--time-stamp"}
        />
      </div>
      <PostContent content={content} />
    </div>
  );
};

export default PostBody;
