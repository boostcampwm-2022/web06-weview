import React from "react";
import useModalStore from "@/store/useModalStore";
import SnapShotNav from "./SnapShotNav/SnapShotNav";
import WritingForm from "./WritingForm/WritingForm";
import SubmitModal from "@/components/WriteModal/SubmitModal/SubmitModal";

const WriteModal = (): JSX.Element => {
  const { isOpened } = useModalStore((state) => ({
    isOpened: state.isWritingModalOpened,
  }));

  return (
    <div className={isOpened ? "write-modal open" : "write-modal close"}>
      <SnapShotNav />
      <WritingForm />
      <SubmitModal />
    </div>
  );
};

export default WriteModal;
