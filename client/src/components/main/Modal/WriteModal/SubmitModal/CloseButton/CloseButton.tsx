import React from "react";

import "./CloseButton.scss";

import useModalStore from "@/store/useModalStore";

const CloseButton = (): JSX.Element => {
  const { closeModal } = useModalStore((state) => ({
    closeModal: state.closeSubmitModal,
  }));

  return (
    <button className="writing-close-button" onClick={closeModal}>
      닫기
    </button>
  );
};

export default CloseButton;
