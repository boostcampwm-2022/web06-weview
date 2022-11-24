import React from "react";
import useOAuthPopup from "@/hooks/useOAuthPopup";

const NotLoggedInReviewForm = (): JSX.Element => {
  const { handleOpenOAuthPopup } = useOAuthPopup();

  return (
    <div className="not-logged-in-review-form">
      <div>로그인이 필요합니다.</div>
      <button
        className="not-logged-in-review-form--login-button"
        onClick={handleOpenOAuthPopup}
      >
        로그인
      </button>
    </div>
  );
};

export default NotLoggedInReviewForm;
