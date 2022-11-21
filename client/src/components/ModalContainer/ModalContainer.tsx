import React, { useCallback, MouseEvent } from "react";
import useModalStore from "@/store/useModalStore";
import SearchModal from "@/components/MainNav/Filter/SearchModal/SearchModal";
import WriteModal from "@/components/WriteModal/WriteModal";

const ModalContainer = (): JSX.Element => {
  const { closeRecentOpenedModal, resetRecentOpenedModal } = useModalStore(
    (state) => ({
      closeRecentOpenedModal: state.closeRecentOpenedModal,
      resetRecentOpenedModal: state.resetRecentOpenedModal,
    })
  );

  const clickWrapperBackGround = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (closeRecentOpenedModal === null) return;
      closeRecentOpenedModal();
      resetRecentOpenedModal();
    },
    [closeRecentOpenedModal]
  );

  return closeRecentOpenedModal !== null ? (
    <>
      <div className="modal-background" onClick={clickWrapperBackGround} />
      <SearchModal />
      <WriteModal />
    </>
  ) : (
    <></>
  );
};

export default ModalContainer;
