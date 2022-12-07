import React, { ReactNode, useRef } from "react";

import ModalContainer from "@/components/commons/Modal/ModalContainer/ModalContainer";
import ModalWrapper from "@/components/commons/Modal/ModalWrapper/ModalWrapper";
import ModalOverlay from "@/components/commons/Modal/ModalOverlay/ModalOverlay";
import useBackgroundMouseDown from "@/hooks/useBackgroundMouseDown";
import ModalTitle from "@/components/commons/Modal/ModalTitle/ModalTitle";
import ModalContents from "@/components/commons/Modal/ModalContents/ModalContents";

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
  useBackgroundMouseDown(modalRef, handleModalClose);

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
