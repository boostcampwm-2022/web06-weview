import React, { FormEvent, useCallback } from "react";
import TitleInput from "./TitleInput/TitleInput";
import CodeEditor from "./CodeEditor/CodeEditor";
import PrettifyButton from "./PrettifyButton/PrettifyButton";
import SubmitButton from "./SubmitButton/SubmitButton";
import useModalStore from "@/store/useModalStore";

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
      <TitleInput />
      <CodeEditor />
      <div className="writing-form__buttons">
        <PrettifyButton />
        <SubmitButton />
      </div>
    </form>
  );
};

export default WritingForm;
