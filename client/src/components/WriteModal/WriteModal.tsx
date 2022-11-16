import React from "react";
import useModalStore from "@/store/useModalStore";
import CloseButton from "./CloseButton/CloseButton";
import SnapShotNav from "./SnapShotNav/SnapShotNav";
import WritingForm from "./WritingForm/WritingForm";
import SubmitModal from "@/components/WriteModal/SubmitModal/SubmitModal";

const WriteModal = (): JSX.Element => {
  const { isOpened } = useModalStore((state) => ({
    isOpened: state.isWritingModalOpened,
  }));

  return (
    <div className={isOpened ? "modal open" : "modal close"}>
      <CloseButton />
      <SnapShotNav />
      <WritingForm />
      <SubmitModal />
    </div>
  );
};

export default WriteModal;
