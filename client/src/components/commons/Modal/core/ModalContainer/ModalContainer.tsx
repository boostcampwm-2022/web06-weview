import React, { ReactNode, ReactPortal } from "react";
import { createPortal } from "react-dom";

interface ModalContainerProps {
  children: ReactNode;
}

const ModalContainer = ({ children }: ModalContainerProps): ReactPortal => {
  const modalElement = document.getElementById("modal") as HTMLElement;
  const modalContents = <>{children}</>;

  return createPortal(modalContents, modalElement);
};

export default ModalContainer;
