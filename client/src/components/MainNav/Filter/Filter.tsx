import React from "react";
import SearchModal from "@/components/MainNav/Filter/SearchModal/SearchModal";

const Filter = (): JSX.Element => {
  // const [searchParams] = useSearchModal();

  return (
    <section className="filter">
      <h4 className="filter__header">검색 필터</h4>
      <input
        className="filter__input"
        type="search"
        placeholder={"태그를 선택해주세요"}
        disabled
        // value={searchParams ?? ""}
      />
      <SearchModal />
    </section>
  );
};

export default Filter;
