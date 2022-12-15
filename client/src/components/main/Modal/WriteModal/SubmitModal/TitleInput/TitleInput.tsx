import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";

import useWritingStore from "@/store/useWritingStore";
import useWritingModalStore from "@/store/useWritingModalStore";

import "./TitleInput.scss";

const TitleInput = (): JSX.Element => {
  const { title, setTitle } = useWritingStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
  }));
  const isOpened = useWritingModalStore((state) => state.isSubmitModalOpened);
  const titleRef = useRef<HTMLInputElement>(null);

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  useEffect(() => {
    titleRef.current?.focus();
  }, [isOpened]);

  return (
    <div className="title">
      <label className="title__label" htmlFor="title">
        제목
      </label>
      <input
        id="title"
        className="title__input"
        value={title}
        onChange={changeTitle}
        ref={titleRef}
      />
    </div>
  );
};

export default TitleInput;
