import React from "react";

import useAuthStore from "@/store/useAuthStore";

import NotLoggedInProfile from "./NotLoggedInProfile/NotLoggedInProfile";
import UserProfile from "./UserProfile/UserProfile";

import "./Profile.scss";

const Profile = (): JSX.Element => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="profile">
      {isLoggedIn ? <UserProfile /> : <NotLoggedInProfile />}
    </div>
  );
};

export default Profile;
