import React from "react";
import { Label } from "@/types/search";
import "./SearchLabel.scss";

interface SearchLabelProps {
  label: Label;
  onClick: () => void;
}

const SearchLabel = ({ label, onClick }: SearchLabelProps): JSX.Element => {
  return (
    <span
      className={`search-form__label--${label.type}`}
      onClick={() => onClick()}
    >
      {label.value}
    </span>
  );
};

export default SearchLabel;
