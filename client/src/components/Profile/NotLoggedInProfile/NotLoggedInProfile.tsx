import React from "react";

import "./NotLogginedProfile.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const NotLoggedInProfile = (): JSX.Element => {
  return (
    <div className="not-logged-in-profile">
      <AccountCircleRoundedIcon fontSize="small" />
      <div>로그인이 필요합니다.</div>
    </div>
  );
};

export default NotLoggedInProfile;
