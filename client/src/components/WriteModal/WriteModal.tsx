import React from "react";
import useModalStore from "@/store/useModalStore";
import TitleInput from "./TitleInput/TitleInput";
import CloseButton from "@/components/WriteModal/CloseButton/CloseButton";
import SnapShotNav from "@/components/WriteModal/SnapShotNav/SnapShotNav";
import CodeEditor from "@/components/WriteModal/CodeEditor/CodeEditor";

const WriteModal = (): JSX.Element => {
  const { isOpened } = useModalStore((state) => ({
    isOpened: state.isWritingModalOpened,
  }));

  return (
    <div className={isOpened ? "modal open" : "modal close"}>
      <CloseButton />
      <SnapShotNav />
      <form className="writing-form">
        <TitleInput />
        <CodeEditor />
      </form>
    </div>
  );
};

export default WriteModal;
