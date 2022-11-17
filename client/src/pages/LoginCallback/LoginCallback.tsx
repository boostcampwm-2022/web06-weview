import { LOCAL_URL } from "@/constants/env";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./LoginCallback.scss";

const LoginCallback = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const targetWindow = window.opener;
    const targetOrigin = LOCAL_URL;

    /**
     * 팝업을 생성한 Window 에 OAuth Authorization Code 를 전달한다.
     */
    targetWindow.postMessage({ code }, targetOrigin);
  }, [searchParams]);

  return (
    <div className="login-callback">
      <div className="login-callback__spinner"></div>
    </div>
  );
};

export default LoginCallback;
