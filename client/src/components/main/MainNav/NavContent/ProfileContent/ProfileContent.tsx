import React from "react";

import useAuth from "@/hooks/useAuth";

import "./ProfileContent.scss";

const ProfileContentHeader = (): JSX.Element => {
  return <div className="profile-content__content-title">프로필</div>;
};

const ProfileContent = (): JSX.Element => {
  const { handleLogin, handleLogout } = useAuth();
  return (
    <div className="profile-content">
      <ProfileContentHeader />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default ProfileContent;
