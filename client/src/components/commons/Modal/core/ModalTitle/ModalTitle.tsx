import React from "react";

import "./ModalTitle.scss";

interface ModalTitleProps {
  title?: string;
}

const ModalTitle = ({ title }: ModalTitleProps): JSX.Element => {
  return <div className="modal-title">{title ?? ""}</div>;
};

export default ModalTitle;
