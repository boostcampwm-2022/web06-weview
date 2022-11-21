import React from "react";
import { Label } from "@/types/search";

interface SearchLabelProps {
  label: Label;
}

const SearchLabel = ({ label }: SearchLabelProps): JSX.Element => {
  return (
    <span className={`search-form__label--${label.type}`}>{label.value}</span>
  );
};

export default SearchLabel;
