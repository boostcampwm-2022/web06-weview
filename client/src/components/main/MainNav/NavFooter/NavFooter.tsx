import React, { MouseEventHandler } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";

import "./NavFooter.scss";

const NavFooter = (): JSX.Element => {
  const handleMenuClick: MouseEventHandler = () => {
    console.log("footer");
  };

  return (
    <section className="nav__footer">
      <NavMenu
        Icon={SettingsOutlinedIcon}
        detail="설정"
        onClick={handleMenuClick}
      />
      <div className="active nav__footer__active"></div>
    </section>
  );
};

export default NavFooter;
