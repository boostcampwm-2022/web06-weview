import React from "react";
import { SvgIcon } from "@mui/material";

import "./SvgIconButton.scss";

interface SvgIconButtonProps {
  Icon: typeof SvgIcon;
  detail: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  color?: string;
}

const SvgIconButton = ({
  Icon,
  detail,
  onClick,
  className = "",
  color = "#222222",
}: SvgIconButtonProps): JSX.Element => {
  return (
    <div className={`svg-icon-button ${className}`} onClick={onClick}>
      <Icon
        className="svg-icon-button__icon"
        style={{ color: color ?? "#222" }}
      />
      <div
        className="svg-icon-button__detail"
        style={{ color: color ?? "#222" }}
      >
        {detail}
      </div>
    </div>
  );
};

export default SvgIconButton;
