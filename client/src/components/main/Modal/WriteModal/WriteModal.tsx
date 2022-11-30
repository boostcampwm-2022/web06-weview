import React from "react";

import SubmitModal from "@/components/main/Modal/WriteModal/SubmitModal/SubmitModal";

import SnapShotNav from "./SnapShotNav/SnapShotNav";
import WritingForm from "./WritingForm/WritingForm";

import "./WriteModal.scss";

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
