import React from "react";
import NotLoggedInProfile from "./NotLoggedInProfile/NotLoggedInProfile";
import UserProfile from "./UserProfile/UserProfile";
import useAuthStore from "@/store/useAuthStore";
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
