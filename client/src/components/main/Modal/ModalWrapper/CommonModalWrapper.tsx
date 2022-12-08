import React, { useCallback, MouseEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";

import ModalContainer from "@/components/main/Modal/ModalContainer/ModalContainer";
import useCommonModalStore from "@/store/useCommonModalStore";
import { isCloseModalElement } from "@/utils/dom";

import "./ModalWrapper.scss";

const CommonModalWrapper = (): JSX.Element => {
  const [modalContent, closeModal] = useCommonModalStore((state) => [
    state.modalContent,
    state.closeModal,
  ]);

  const clickWrapperBackGround = useCallback(
    (e: MouseEvent<HTMLDivElement | SVGSVGElement>) => {
      if (!isCloseModalElement(e.target as HTMLElement)) return;
      closeModal();
    },
    []
  );

  return modalContent !== null ? (
    <>
      <div className="modal-background" onClick={clickWrapperBackGround}>
        <CloseIcon
          className="modal-close-button"
          onClick={clickWrapperBackGround}
        />
        <ModalContainer content={modalContent} />
      </div>
    </>
  ) : (
    <></>
  );
};

export default CommonModalWrapper;
