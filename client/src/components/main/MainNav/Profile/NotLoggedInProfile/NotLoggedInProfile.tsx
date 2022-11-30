import React from "react";
import useOAuthPopup from "@/hooks/useOAuthPopup";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const NotLoggedInProfile = (): JSX.Element => {
  const { handleOpenOAuthPopup } = useOAuthPopup();

  return (
    <>
      <div className="not-logged-in-profile__wrapper">
        <AccountCircleOutlinedIcon className="not-logged-in-profile__image" />
        <span className="not-logged-in-profile__alert">
          로그인이 필요합니다.
        </span>
      </div>
      <button
        onClick={handleOpenOAuthPopup}
        className="not-logged-in-profile__button"
        data-cy={"login-btn"}
      >
        로그인
      </button>
    </>
  );
};

export default NotLoggedInProfile;
