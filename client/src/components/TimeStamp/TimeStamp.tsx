import React, { useCallback, useEffect, useState } from "react";
import { diff } from "@/utils/timeUtils";

interface TimeStampProps {
  updatedAt: string;
  className?: string;
}

const TimeStamp = ({ updatedAt, className }: TimeStampProps): JSX.Element => {
  const [timeTagTitle, setTimeTagTitle] = useState("");
  const [history, setHistory] = useState("");

  const getTitle = useCallback((): string => {
    const date = new Date(updatedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}월 ${day}일, ${year}`;
  }, [updatedAt]);

  const getHistory = useCallback((): string => {
    const date = new Date(updatedAt);
    const { minDiff, hourDiff, dayDiff, monthDiff, yearDiff } = diff(date);

    if (yearDiff > 0) {
      return `${yearDiff} 년 전`;
    }
    if (monthDiff > 0) {
      return `${monthDiff} 개월 전`;
    }
    if (dayDiff > 0) {
      return `${dayDiff} 일 전`;
    }
    if (hourDiff > 0) {
      return `${hourDiff} 시간 전`;
    }
    if (minDiff > 0) {
      return `${minDiff} 분 전`;
    }
    return "방금 전";
  }, [updatedAt]);

  useEffect(() => {
    setTimeTagTitle(getTitle());
    setHistory(getHistory());
  }, [updatedAt]);

  return (
    <time
      className={className !== undefined ? className : ""}
      dateTime={updatedAt}
      title={timeTagTitle}
    >
      {history}
    </time>
  );
};

export default TimeStamp;
