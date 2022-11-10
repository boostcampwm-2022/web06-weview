import React, { useEffect } from "react";

import "./NotLoggedInProfile.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { githubLogInAPI } from "../../../apis/auth";
import useAuthStore from "../../../store/useAuthStore";
import useOAuthPopup from "../../../hooks/useOAuthPopup";

const NotLoggedInProfile = (): JSX.Element => {
  const { popup, clearPopup, handleOpenOAuthPopup, getAuthCode } =
    useOAuthPopup();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (popup === null) {
      return;
    }

    const timer = setInterval(() => {
      const authCode = getAuthCode();
      if (authCode === null) {
        return clearPopup();
      }

      // 여기에 서버 통신 로직을 추가
      githubLogInAPI(authCode)
        .then((userData) => {
          console.log("user:", userData);
          login();
        })
        .catch((e) => {
          console.log("서버에 요청을 보내는 데 실패했습니다.", e);
        })
        .finally(() => {
          return clearPopup();
        });
    }, 500);

    return () => {
      clearPopup();
      clearInterval(timer);
    };
  }, [popup]);

  return (
    <div className="not-logged-in-profile" onClick={handleOpenOAuthPopup}>
      <AccountCircleRoundedIcon
        className="not-logged-in-profile__image"
        fontSize="small"
      />
      <div className="not-logged-in-profile__alert">로그인이 필요합니다.</div>
    </div>
  );
};

export default NotLoggedInProfile;
