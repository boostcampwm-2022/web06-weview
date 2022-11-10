import { useCallback, useState } from "react";

interface OAuthPopup {
  popup: Window | null;
  clearPopup: () => void;
  handleOpenOAuthPopup: () => void;
  getAuthCode: () => string | null;
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

    // TODO : 상수로 빼기
    const url = import.meta.env.VITE_GITHUB_AUTH_SERVER_URL;

    const popup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setPopup(popup);
  }, []);

  // 팝업을 닫고 null 로 초기화합니다.
  const clearPopup = useCallback((): void => {
    if (popup !== null) {
      popup.close();
    }
    setPopup(null);
  }, [popup]);

  // 팝업 URL 에서 Github Authorizaion Code 를 가져옵니다.
  const getAuthCode = useCallback((): string | null => {
    if (popup === null) {
      return null;
    }

    const popupUrl = popup.location.href;
    if (popupUrl === null) {
      console.log("url 없음");
      return null;
    }

    const searchParams = new URL(popupUrl).searchParams;
    const code = searchParams.get("code"); // "code" 쿼리스트링 혹은 null 반환

    return code;
  }, [popup]);

  return { popup, clearPopup, handleOpenOAuthPopup, getAuthCode };
};

export default useOAuthPopup;
