import React, { ChangeEvent, useCallback } from "react";
import useWritingStore from "@/store/useWritingStore";

const TitleInput = (): JSX.Element => {
  const { title, setTitle } = useWritingStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
  }));

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  return (
    <input
      className="title"
      value={title}
      onChange={changeTitle}
      placeholder="제목을 입력해주세요"
    />
  );
};

export default TitleInput;
