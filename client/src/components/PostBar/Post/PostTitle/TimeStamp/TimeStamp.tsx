import React, { useCallback, useContext, useEffect, useState } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";
const MS_TO_MINUTE = 1000 * 60;
const MS_TO_HOUR = 1000 * 60 * 60;
const MS_TO_DAY = 1000 * 60 * 60 * 24;
const MS_TO_MONTH = 1000 * 60 * 60 * 24 * 30;
const MS_TO_YEAR = 1000 * 60 * 60 * 24 * 30 * 12;

const TimeStamp = (): JSX.Element => {
  const { updatedAt } = useContext(PostContext);

  const [title, setTitle] = useState("");
  const [history, setHistory] = useState("");

  const getTitle = useCallback((): string => {
    const date = new Date(updatedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}월 ${day}일, ${year}`;
  }, [updatedAt]);

  const getHistory = useCallback((): string => {
    const now = new Date();
    const date = new Date(updatedAt);

    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / MS_TO_MINUTE);
    const diffHour = Math.floor(diffMs / MS_TO_HOUR);
    const diffDay = Math.floor(diffMs / MS_TO_DAY);
    const diffMon = Math.floor(diffMs / MS_TO_MONTH);
    const diffYear = Math.floor(diffMs / MS_TO_YEAR);

    if (diffYear > 0) {
      return `${diffYear} 년 전`;
    }
    if (diffMon > 0) {
      return `${diffMon} 개월 전`;
    }
    if (diffDay > 0) {
      return `${diffDay} 일 전`;
    }
    if (diffHour > 0) {
      return `${diffHour} 시간 전`;
    }
    if (diffMin > 0) {
      return `${diffMin} 분 전`;
    }
    return "방금";
  }, [updatedAt]);

  useEffect(() => {
    setTitle(getTitle());
    setHistory(getHistory());
  }, [updatedAt]);

  return (
    <time className="post__title__timestamp" dateTime={updatedAt} title={title}>
      {history}
    </time>
  );
};

export default TimeStamp;
