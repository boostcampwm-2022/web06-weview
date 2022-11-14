import React from "react";
import TitleInput from "./TitleInput/TitleInput";
import CodeEditor from "./CodeEditor/CodeEditor";
import PrettifyButton from "./PrettifyButton/PrettifyButton";
import SubmitButton from "./SubmitButton/SubmitButton";

const WritingForm = (): JSX.Element => {
  return (
    <form className="writing-form">
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
