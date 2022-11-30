import React from "react";
import SnapShotNav from "./SnapShotNav/SnapShotNav";
import WritingForm from "./WritingForm/WritingForm";
import SubmitModal from "@/components/Modal/WriteModal/SubmitModal/SubmitModal";

const WriteModal = (): JSX.Element => {
  return (
    <div className="write-modal open">
      <SnapShotNav />
      <WritingForm />
      <SubmitModal />
    </div>
  );
};

export default WriteModal;
