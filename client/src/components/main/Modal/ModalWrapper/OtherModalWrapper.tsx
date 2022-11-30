import React, { useCallback, MouseEvent } from "react";
import useModalStore from "@/store/useModalStore";
import SearchModal from "@/components/Modal/SearchModal/SearchModal";

const OtherModalContainer = (): JSX.Element => {
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
    </>
  ) : (
    <></>
  );
};

export default OtherModalContainer;
