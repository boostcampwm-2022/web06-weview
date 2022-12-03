import React from "react";

import useAuth from "@/hooks/useAuth";

import "./ReviewForm.scss";

const NotLoggedInReviewForm = (): JSX.Element => {
  const { handleLogin } = useAuth();

  return (
    <div className="not-logged-in-review-form">
      <div>로그인이 필요합니다.</div>
      <button
        className="not-logged-in-review-form--login-button"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
};

export default NotLoggedInReviewForm;
