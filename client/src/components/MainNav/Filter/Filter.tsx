import React from "react";

const Filter = (): JSX.Element => {
  return (
    <section className="filter">
      <h4 className="filter__header">검색 필터</h4>
      <input
        className="filter__input"
        type="search"
        placeholder={"태그를 선택해주세요"}
      />
    </section>
  );
};

export default Filter;
