import React from "react";
import "./SearchModal.scss";
import useModalStore from "@/store/useModalStore";

const SearchModal = (): JSX.Element => {
  const { isSearchModalOpened } = useModalStore((state) => ({
    isSearchModalOpened: state.isSearchModalOpened,
  }));
  return isSearchModalOpened ? (
    <div className="search-modal">
      <input className="search-modal__input" placeholder="hello" />
      <div className="search-modal__info"></div>
    </div>
  ) : (
    <></>
  );
};

export default SearchModal;
