import React, { MouseEventHandler } from "react";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useNav from "@/hooks/useNav";
import useAuth from "@/hooks/useAuth";

import "./ProfileMenu.scss";

const ProfileMenu = (): JSX.Element => {
  const { isLoggedIn, myInfo } = useAuth();
  const { handleProfile } = useNav();

  const handleMenuClick: MouseEventHandler = () => {
    handleProfile();
  };

  if (isLoggedIn && myInfo !== null) {
    return (
      <span className="nav__sidebar__profile-menu" onClick={handleMenuClick}>
        <img
          className="nav__sidebar__profile-menu__icon"
          src={myInfo.profileUrl}
        />
        <span className="nav__sidebar__profile-menu__detail">프로필</span>
      </span>
    );
  }

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
