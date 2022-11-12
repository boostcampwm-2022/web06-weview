import React, { useEffect } from "react";
import "./NotLoggedInProfile.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { githubLogInAPI } from "@/apis/auth";
import useAuthStore from "@/store/useAuthStore";
import useOAuthPopup from "@/hooks/useOAuthPopup";

const NotLoggedInProfile = (): JSX.Element => {
  const { popup, clearPopup, handleOpenOAuthPopup } = useOAuthPopup();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (popup === null) {
      return;
    }

    /**
     * 팝업 Window 에서 Github OAuth Authorization Code 전달 이벤트를
     * 수신하여 처리하는 이벤트 리스너
     */
    const githubOAuthCodeListener = (e: MessageEvent<any>): void => {
      // 동일한 Origin 의 이벤트만 처리하도록 제한
      if (e.origin !== window.location.origin) {
        return;
      }
      const { code } = e.data;

      githubLogInAPI(code)
        .then((userData) => {
          login();
        })
        .catch((e) => {
          console.log("서버에 요청을 보내는 데 실패했습니다.", e);
        })
        .finally(() => {
          return clearPopup();
        });
    };

    window.addEventListener("message", githubOAuthCodeListener, false);

    return () => {
      window.removeEventListener("message", githubOAuthCodeListener);
      clearPopup();
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
