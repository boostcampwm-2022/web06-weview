import React from "react";

import useWritingModalStore from "@/store/useWritingModalStore";

import "./CloseButton.scss";

const CloseButton = (): JSX.Element => {
  const { closeModal } = useWritingModalStore((state) => ({
    closeModal: state.closeSubmitModal,
  }));

  return (
    <button className="writing-close-button" onClick={closeModal}>
      닫기
    </button>
  );
};

export default CloseButton;
