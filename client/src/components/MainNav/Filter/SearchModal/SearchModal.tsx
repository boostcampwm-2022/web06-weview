import React from "react";
import "./SearchModal.scss";
import useModalStore from "@/store/useModalStore";

const SearchModal = () => {
  const { isSearchModalOpened } = useModalStore((state) => ({
    isSearchModalOpened: state.isSearchModalOpened,
  }));

  return (
    <div className="search-modal">
      <input className="search-modal__input" placeholder="hello" />
      <div className="search-modal__info"></div>
    </div>
  );
};

export default SearchModal;
