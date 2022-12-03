import React from "react";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import useAuth from "@/hooks/useAuth";
import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";

import "./ProfileContent.scss";

// 프로필 이미지 + 닉네임 + 이메일
const ProfileContentHeader = (): JSX.Element => {
  const { isLoggedIn, myInfo } = useAuth();

  if (isLoggedIn && myInfo !== null) {
    return (
      <>
        <div className="profile-content__content-title">프로필</div>
        <div className="profile-content__profile">
          <img
            className="profile-content__profile__image"
            src={myInfo.profileUrl}
          />
          <div className="profile-content__profile__info">
            <div className="profile-content__profile__info--nickname">
              {myInfo.nickname}
            </div>
            <div className="profile-content__profile__info--email">
              {myInfo.email}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="profile-content__content-title">프로필</div>
      <div className="profile-content__profile">
        <AccountCircleTwoToneIcon className="profile-content__profile__image" />
        <div className="profile-content__profile__info">
          <div className="profile-content__profile__info--nickname">
            로그인이 필요합니다.
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileContentMenus = (): JSX.Element => {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <div className="profile-content__menus">
      <div className="title">메뉴</div>
      {isLoggedIn ? (
        <NavMenu
          Icon={LogoutIcon}
          detail={"로그아웃"}
          onClick={handleLogout}
          className="profile-content__menus__menu"
        />
      ) : (
        <NavMenu
          Icon={LoginIcon}
          detail={"로그인"}
          onClick={handleLogin}
          className="profile-content__menus__menu"
        />
      )}
    </div>
  );
};

const ProfileContent = (): JSX.Element => {
  return (
    <div className="profile-content">
      <ProfileContentHeader />
      <ProfileContentMenus />
    </div>
  );
};

export default ProfileContent;
