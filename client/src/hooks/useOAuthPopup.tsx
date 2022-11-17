import { useCallback, useState } from "react";
import { GITHUB_AUTH_SERVER_URL } from "@/constants/env";

interface OAuthPopup {
  popup: Window | null;
  clearPopup: () => void;
  handleOpenOAuthPopup: () => void;
}

const useOAuthPopup = (): OAuthPopup => {
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

  return { popup, clearPopup, handleOpenOAuthPopup };
};

export default useOAuthPopup;
