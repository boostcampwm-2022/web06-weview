import React, { ReactNode } from "react";
import useCommonModalStore from "@/store/useCommonModalStore";

interface ModalContent {
  content: ReactNode;
}

const ModalContainer = ({ content }: ModalContent): JSX.Element => {
  const [isOpened] = useCommonModalStore((state) => [state.isOpened]);

  return (
    <div
      className={isOpened ? "modal-container open" : "modal-container close"}
    >
      {content}
    </div>
  );
};

export default ModalContainer;
