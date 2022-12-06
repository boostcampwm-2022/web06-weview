import React from "react";
import { SvgIcon } from "@mui/material";

import "./NavMenu.scss";

interface NavMenuProps {
  Icon: typeof SvgIcon;
  detail: string;
  onClick: React.MouseEventHandler;
  className?: string;
}

const NavMenu = ({
  Icon,
  detail,
  onClick,
  className = "",
}: NavMenuProps): JSX.Element => {
  return (
    <span className={`nav-menu ${className}`} onClick={onClick}>
      <Icon className="nav-menu__icon" />
      <span className="nav-menu__detail">{detail}</span>
    </span>
  );
};

export default NavMenu;
