import { LOCAL_URL } from "@/constants/env";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

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

  return <LoadingSpinner />;
};

export default LoginCallback;
