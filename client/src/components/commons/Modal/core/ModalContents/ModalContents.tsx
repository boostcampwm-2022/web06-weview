import React, { ReactNode } from "react";

import "./ModalContents.scss";

interface ModalContentsProps {
  children?: ReactNode;
}

const ModalContents = ({ children }: ModalContentsProps): JSX.Element => {
  return <div className="modal-contents">{children}</div>;
};

export default ModalContents;
