import React from "react";

import "./UserProfile.scss";
import { logOutAPI } from "@/apis/auth";
import customLocalStorage from "@/utils/localStorage";
import useAuthStore from "@/store/useAuthStore";

const UserProfile = (): JSX.Element => {
  const { myInfo, logout } = useAuthStore((state) => ({
    myInfo: state.myInfo,
    logout: state.logout,
  }));

  /**
   * 로컬스토리지에 expiresIn 지우기
   * 서버에 지워달라 요청
   */
  const handleLogout = (): void => {
    logOutAPI()
      .then(() => {
        customLocalStorage.removeItem("expiresIn");
        logout();
      })
      .catch((e) => console.log("로그아웃 실패", e));
  };

  return (
    <>
      <div className="user-profile">
        <img className="user-profile__image" src={myInfo?.profileUrl} />
        <span className="user-profile__name">{myInfo?.nickname}</span>
      </div>
      <div className="profile-button">
        <button className="profile-button--logout" onClick={handleLogout}>
          로그아웃
        </button>
        <button className="profile-button--my-page">마이페이지</button>
      </div>
    </>
  );
};

export default UserProfile;
