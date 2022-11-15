import React from "react";
import useModalStore from "@/store/useModalStore";

const CloseButton = (): JSX.Element => {
  const { closeModal } = useModalStore((state) => ({
    closeModal: state.closeSubmitModal,
  }));

  return (
    <button className="submit-modal__button--close" onClick={closeModal}>
      닫기
    </button>
  );
};

export default CloseButton;
