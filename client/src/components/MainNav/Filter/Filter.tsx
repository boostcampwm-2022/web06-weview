import React, { MouseEvent } from "react";
import SearchModal from "@/components/MainNav/Filter/SearchModal/SearchModal";
import useModalStore from "@/store/useModalStore";

const Filter = (): JSX.Element => {
  const { openSearchModal } = useModalStore((state) => ({
    openSearchModal: state.openSearchModal,
  }));

  const handleOnClick = (e: MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    openSearchModal();
  };
  return (
    <section className="filter">
      <h4 className="filter__header">검색 필터</h4>
      <input
        className="filter__input"
        type="search"
        placeholder={"태그를 선택해주세요"}
        onClick={handleOnClick}
        // disabled
        // value={searchParams ?? ""}
      />
    </section>
  );
};

export default Filter;
