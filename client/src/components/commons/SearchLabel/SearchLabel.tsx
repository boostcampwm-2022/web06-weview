import React from "react";

import { Label } from "@/types/search";

import "./SearchLabel.scss";

interface LabelProps {
  label: Label;
  onClickCallback: Function;
}

const SearchLabel = React.memo(
  ({ label, onClickCallback }: LabelProps): JSX.Element => {
    return (
      <span
        className={`search-label ${label.type}`}
        onClick={() => onClickCallback(label)}
      >
        {label.value}
      </span>
    );
  }
);

export default SearchLabel;
