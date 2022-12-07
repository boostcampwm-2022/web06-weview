import React, { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";

import useWritingModalStore from "@/store/useWritingModalStore";

import "./CloseButton.scss";

const CloseButton = (): JSX.Element => {
  const { closeModal } = useWritingModalStore((state) => ({
    closeModal: state.closeWritingModal,
  }));

  const clickCloseBtn = useCallback(() => {
    closeModal();
  }, []);

  return (
    <button onClick={clickCloseBtn} className={"close-btn"}>
      <CloseIcon className={"close-btn__icon"} />
    </button>
  );
};

export default CloseButton;
