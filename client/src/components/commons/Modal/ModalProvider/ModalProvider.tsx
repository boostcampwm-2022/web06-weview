import React, { ReactPortal } from "react";
import { createPortal } from "react-dom";

import useModalStore from "@/store/useModalStore";
import PostMoreModal from "@/components/main/PostScroll/Post/PostFooter/RightBlockItems/PostMoreModal/PostMoreModal";
import { MODAL_KEY, ModalProps } from "@/types/modal";

const MODALS = new Map<MODAL_KEY, React.FC<ModalProps>>([
  [MODAL_KEY.POST_MORE, PostMoreModal],
]);

const ModalProvider = (): ReactPortal => {
  const modals = useModalStore((state) => state.modals);
  const Modals = modals.map(({ key, props }) => {
    const Modal = MODALS.get(key) as React.FC<ModalProps>;
    return <Modal key={key} {...props} />;
  });

  return createPortal(
    <>{Modals}</>,
    document.getElementById("modal") as Element
  );
};

export default ModalProvider;
