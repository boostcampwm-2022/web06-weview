import React, { useCallback, MouseEvent } from "react";
import useModalStore from "@/store/useModalStore";
import CloseButton from "./CloseButton/CloseButton";
import SnapShotNav from "./SnapShotNav/SnapShotNav";
import WritingForm from "./WritingForm/WritingForm";
import SubmitModal from "@/components/WriteModal/SubmitModal/SubmitModal";

const WriteModal = (): JSX.Element => {
  const { isOpened, closeModal } = useModalStore((state) => ({
    isOpened: state.isWritingModalOpened,
    closeModal: state.closeWritingModal,
  }));

  const clickWrapper = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const $clicked = (e.target as HTMLElement).closest(".modal");
    if ($clicked === null) {
      closeModal();
    }
  }, []);

  return (
    <div
      onClick={clickWrapper}
      className={isOpened ? "modal__wrapper open" : "modal__wrapper close"}
    >
      <div className="modal">
        <SnapShotNav />
        <WritingForm />
        <SubmitModal />
      </div>
    </div>
  );
};

export default WriteModal;
