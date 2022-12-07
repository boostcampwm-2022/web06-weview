import React, { FormEvent, useCallback } from "react";

import useWritingModalStore from "@/store/useWritingModalStore";

import "./SubmitButton.scss";

const SubmitButton = (): JSX.Element => {
  const { openSubmitModal } = useWritingModalStore((state) => ({
    openSubmitModal: state.openSubmitModal,
  }));

  const clickSubmitButton = useCallback((e: FormEvent<HTMLButtonElement>) => {
    openSubmitModal();
  }, []);

  return (
    <button type="submit" onClick={clickSubmitButton} className="submit-button">
      확인
    </button>
  );
};

export default SubmitButton;
