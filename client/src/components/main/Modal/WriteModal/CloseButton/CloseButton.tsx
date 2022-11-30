import React, { useCallback } from "react";
import "./CloseButton.scss";
import CloseIcon from "@mui/icons-material/Close";
import useModalStore from "@/store/useModalStore";

const CloseButton = (): JSX.Element => {
  const { closeModal } = useModalStore((state) => ({
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
