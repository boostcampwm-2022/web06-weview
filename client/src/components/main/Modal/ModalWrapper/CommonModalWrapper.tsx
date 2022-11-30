import React, { useCallback, MouseEvent } from "react";
import ModalContainer from "@/components/main/Modal/ModalContainer/ModalContainer";
import useCommonModalStore from "@/store/useCommonModalStore";
import "./ModalWrapper.scss";

const CommonModalWrapper = (): JSX.Element => {
  const [modalContent, closeModal] = useCommonModalStore((state) => [
    state.modalContent,
    state.closeModal,
  ]);

  const clickWrapperBackGround = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      closeModal();
    },
    []
  );

  return modalContent !== null ? (
    <>
      <div className="modal-background" onClick={clickWrapperBackGround} />
      <ModalContainer content={modalContent} />
    </>
  ) : (
    <></>
  );
};

export default CommonModalWrapper;
