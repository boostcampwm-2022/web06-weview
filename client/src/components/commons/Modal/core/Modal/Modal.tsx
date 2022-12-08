import React, { ReactNode, useRef } from "react";

import ModalContainer from "@/components/commons/Modal/core/ModalContainer/ModalContainer";
import ModalWrapper from "@/components/commons/Modal/core/ModalWrapper/ModalWrapper";
import ModalOverlay from "@/components/commons/Modal/core/ModalOverlay/ModalOverlay";
import useOutsideClickHandler from "@/hooks/useOutsideClickHandler";
import ModalTitle from "@/components/commons/Modal/core/ModalTitle/ModalTitle";
import ModalContents from "@/components/commons/Modal/core/ModalContents/ModalContents";

interface ModalProps {
  title?: string;
  onClose?: Function;
  children?: ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps): JSX.Element => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleModalClose = (): void => {
    onClose?.();
  };
  useOutsideClickHandler(modalRef, handleModalClose);

  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalWrapper ref={modalRef}>
          <ModalTitle title={title} />
          <ModalContents>{children}</ModalContents>
        </ModalWrapper>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default Modal;
