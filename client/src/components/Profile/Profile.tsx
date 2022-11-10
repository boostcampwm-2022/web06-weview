import React from "react";

import "./Profile.scss";
import NotLoggedInProfile from "./NotLoggedInProfile/NotLoggedInProfile";
import UserProfile from "./UserProfile/UserProfile";
import useAuthStore from "../../store/useAuthStore";

const Profile = (): JSX.Element => {
  // TODO : 전역에서 가져오기
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <UserProfile /> : <NotLoggedInProfile />;
};

export default Profile;
