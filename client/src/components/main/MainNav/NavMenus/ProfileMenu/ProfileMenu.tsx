import React, { MouseEventHandler } from "react";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useNav from "@/hooks/useNav";

const ProfileMenu = (): JSX.Element => {
  const { handleProfile } = useNav();

  const handleMenuClick: MouseEventHandler = () => {
    handleProfile();
  };

  return (
    <NavMenu
      Icon={AccountCircleTwoToneIcon}
      detail={"프로필"}
      onClick={handleMenuClick}
      className="nav__sidebar__menus__menu"
    />
  );
};

export default ProfileMenu;
