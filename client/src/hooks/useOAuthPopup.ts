import { useCallback, useEffect, useState } from "react";

import { GITHUB_AUTH_SERVER_URL } from "@/constants/env";
import { githubLogInAPI } from "@/apis/auth";
import axiosInstance from "@/apis/axios";
import useAuthStore from "@/store/useAuthStore";
import customLocalStorage from "@/utils/localStorage";

interface OAuthPopup {
  popup: Window | null;
  clearPopup: () => void;
  handleOpenOAuthPopup: () => void;
}

const useOAuthPopup = (): OAuthPopup => {
  const login = useAuthStore((state) => state.login);
  const [popup, setPopup] = useState<Window | null>(null);

  // OAuth 팝업을 열어서 Github Authorization Code 를 요청합니다.
  const handleOpenOAuthPopup = useCallback((): void => {
    const title = "로그인 중...";
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const url = GITHUB_AUTH_SERVER_URL;
    const popup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setPopup(popup);
  }, [popup]);

  // 팝업을 닫고 null 로 초기화합니다.
  const clearPopup = useCallback((): void => {
    if (popup !== null) {
      popup.close();
    }
    setPopup(null);
  }, [popup]);

  // 로그인 팝입이 열리면 로그인 로직을 처리합니다.
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
          login(userData);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`;
          customLocalStorage.setItem("expiresIn", String(userData.expiresIn));
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

  return { popup, clearPopup, handleOpenOAuthPopup };
};

export default useOAuthPopup;
