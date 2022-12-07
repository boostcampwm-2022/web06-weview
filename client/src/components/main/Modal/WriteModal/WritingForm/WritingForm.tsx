import React, { FormEvent, useCallback } from "react";

import useWritingModalStore from "@/store/useWritingModalStore";
import LanguageSelector from "@/components/main/Modal/WriteModal/WritingForm/LanguageSelector/LanguageSelector";
import CodeEditor from "@/components/main/CodeEditor/CodeEditor";

import SubmitButton from "./SubmitButton/SubmitButton";

import "./WritingForm.scss";

const WritingForm = (): JSX.Element => {
  const { openSubmitModal } = useWritingModalStore((state) => ({
    openSubmitModal: state.openSubmitModal,
  }));

  const submitWritings = useCallback((e: FormEvent) => {
    e.preventDefault();
    openSubmitModal();
  }, []);

  return (
    <form onSubmit={submitWritings} className="writing-form">
      <LanguageSelector />
      <CodeEditor />
      <div className="writing-form__buttons">
        {/* <PrettifyButton /> */}
        <SubmitButton />
      </div>
    </form>
  );
};

export default WritingForm;
