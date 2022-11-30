import React, { MouseEventHandler, useCallback } from "react";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useAuthStore from "@/store/useAuthStore";
import useOAuthPopup from "@/hooks/useOAuthPopup";
import { logOutAPI } from "@/apis/auth";
import customLocalStorage from "@/utils/localStorage";
import axiosInstance from "@/apis/axios";

const ProfileMenu = (): JSX.Element => {
  const [isLoggedIn, logout] = useAuthStore((state) => [
    state.isLoggedIn,
    state.logout,
  ]);
  const { handleOpenOAuthPopup } = useOAuthPopup();

  // TODO : 클릭 시 모달 or Nav 에 새로운 영역에서 처리
  const handleMenuClick: MouseEventHandler = useCallback(() => {
    if (isLoggedIn) {
      logOutAPI()
        .then(() => {
          customLocalStorage.removeItem("expiresIn");
          logout();
          delete axiosInstance.defaults.headers.common.Authorization;
        })
        .catch((e) => console.log("로그아웃 실패", e));
      return;
    }
    handleOpenOAuthPopup();
  }, [isLoggedIn, logout]);

  return (
    // TODO : [프로필 이미지] [프로필 아이디] 로 변경
    <NavMenu
      Icon={AccountCircleTwoToneIcon}
      detail={"프로필"}
      onClick={handleMenuClick}
      className="nav__menus__menu"
    />
  );
};

export default ProfileMenu;
