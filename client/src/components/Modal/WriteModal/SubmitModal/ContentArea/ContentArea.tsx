import React, { ChangeEvent, useCallback } from "react";
import useWritingStore from "@/store/useWritingStore";

const ContentArea = (): JSX.Element => {
  const { content, setContent } = useWritingStore((state) => ({
    content: state.content,
    setContent: state.setContent,
  }));

  const changeContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  return (
    <>
      <label className="content-label" htmlFor="content">
        코드에 대한 소개나 질문등을 입력해주세요
      </label>
      <textarea
        value={content}
        onChange={changeContent}
        id="content"
        className="content-textarea"
        spellCheck={false}
      />
    </>
  );
};

export default ContentArea;
