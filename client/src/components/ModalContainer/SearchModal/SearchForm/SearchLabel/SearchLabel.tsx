import React from "react";
import { Label } from "@/types/search";

interface SearchLabelProps {
  key: number;
  label: Label;
}

const SearchLabel = ({ key, label }: SearchLabelProps): JSX.Element => {
  return (
    <span key={key} className={`search-form__label--${label.type}`}>
      {label.value}
    </span>
  );
};

export default SearchLabel;
