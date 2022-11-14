import React from "react";
import useModalStore from "@/store/useModalStore";
import TitleInput from "./TitleInput/TitleInput";
import CloseButton from "@/components/WriteModal/CloseButton/CloseButton";

const WriteModal = (): JSX.Element => {
  const { isOpened } = useModalStore((state) => ({
    isOpened: state.isWritingModalOpened,
  }));

  return (
    <div className={isOpened ? "modal open" : "modal close"}>
      <CloseButton />
      {/* <SnapShotNav /> */}
      <form>
        <TitleInput />
        {/* <Editor /> */}
      </form>
    </div>
  );
};

export default WriteModal;
