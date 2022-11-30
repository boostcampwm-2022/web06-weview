import React from "react";

import useModalStore from "@/store/useModalStore";
import SearchForm from "@/components/main/Modal/SearchModal/SearchForm/SearchForm";
import { DESCRIPTION } from "@/constants/search";

import "./SearchModal.scss";

const SearchModal = (): JSX.Element => {
  const { isSearchModalOpened } = useModalStore((state) => ({
    isSearchModalOpened: state.isSearchModalOpened,
  }));

  return isSearchModalOpened ? (
    <div className="search-modal">
      <SearchForm />
      <div className="search-modal__info">
        {DESCRIPTION.map(({ description, example, type }) => (
          <div className="search-modal__info__item" key={example}>
            <span className="search-modal__info__item--description">
              {description}:
            </span>
            <span className={`search-modal__info__item--example--${type}`}>
              {example}
            </span>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SearchModal;
