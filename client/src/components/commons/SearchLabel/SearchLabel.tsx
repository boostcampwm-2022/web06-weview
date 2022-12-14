import React from "react";

import { Label } from "@/types/search";

import "./SearchLabel.scss";

interface LabelProps {
  label: Label;
  onClickCallback?: Function;
}

const SearchLabel = React.memo(
  ({ label, onClickCallback }: LabelProps): JSX.Element => {
    const handleClick = (): void => {
      if (onClickCallback !== undefined) {
        onClickCallback(label);
      }
    };

    return (
      <span className={`search-label__${label.type}`} onClick={handleClick}>
        <img className={`search-label__${label.type}__icon`} />
        <span className={`search-label__${label.type}__value`}>
          {label.value}
        </span>
      </span>
    );
  }
);

export default SearchLabel;
