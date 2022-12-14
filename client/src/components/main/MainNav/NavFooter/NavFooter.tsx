import React, { MouseEventHandler } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useNav from "@/hooks/useNav";

import "./NavFooter.scss";

const NavFooter = (): JSX.Element => {
  const { handleSetting } = useNav();

  const handleMenuClick: MouseEventHandler = () => {
    handleSetting();
  };

  return (
    <section className="nav__sidebar__footer">
      <NavMenu
        Icon={SettingsOutlinedIcon}
        detail="설정"
        onClick={handleMenuClick}
      />
      <div className="active nav__sidebar__footer__active"></div>
    </section>
  );
};

export default NavFooter;
