import React from "react";
import "./SearchModal.scss";
import useModalStore from "@/store/useModalStore";
import SearchForm from "@/components/ModalContainer/SearchModal/SearchForm/SearchForm";

const SearchModal = (): JSX.Element => {
  const { isSearchModalOpened } = useModalStore((state) => ({
    isSearchModalOpened: state.isSearchModalOpened,
  }));

  return isSearchModalOpened ? (
    <div className="search-modal">
      <SearchForm />
      <div className="search-modal__info"></div>
    </div>
  ) : (
    <></>
  );
};

export default SearchModal;
