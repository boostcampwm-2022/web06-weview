import React, { ReactNode } from "react";

import "./ModalOverlay.scss";

interface ModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay = ({ children }: ModalOverlayProps): JSX.Element => {
  return <div className="modal-overlay">{children}</div>;
};

export default ModalOverlay;
