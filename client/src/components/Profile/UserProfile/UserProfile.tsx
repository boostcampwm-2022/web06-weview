import React from "react";

import "./UserProfile.scss";
import { logOutAPI } from "@/apis/auth";
import customLocalStorage from "@/utils/localStorage";
import useAuthStore from "@/store/useAuthStore";

const UserProfile = (): JSX.Element => {
  const logout = useAuthStore((state) => state.logout);

  // TODO : RQ로 처리하도록 변경
  const user = {
    name: "shyuuuuni",
    avatar_url:
      "https://avatars.githubusercontent.com/u/63703962?s…00&u=77dcbc41de6315d0355e67cca4174dad51a9a50f&v=4",
  };

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
    <div className="user-profile" onClick={handleLogout}>
      <img className="user-profile__image" src={user.avatar_url} />
      <div className="user-profile__name">{user.name}</div>
    </div>
  );
};

export default UserProfile;
