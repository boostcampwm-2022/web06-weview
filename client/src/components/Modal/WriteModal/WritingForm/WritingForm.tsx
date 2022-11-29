import React, { FormEvent, useCallback } from "react";
import SubmitButton from "./SubmitButton/SubmitButton";
import useModalStore from "@/store/useModalStore";
import LanguageSelector from "@/components/Modal/WriteModal/WritingForm/LanguageSelector/LanguageSelector";
import CodeEditor from "@/components/CodeEditor/CodeEditor";

const WritingForm = (): JSX.Element => {
  const { openSubmitModal } = useModalStore((state) => ({
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
