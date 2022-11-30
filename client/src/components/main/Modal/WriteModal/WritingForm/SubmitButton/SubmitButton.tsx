import React, { FormEvent, useCallback } from "react";
import "./SubmitButton.scss";
import useModalStore from "@/store/useModalStore";

const SubmitButton = (): JSX.Element => {
  const { openSubmitModal } = useModalStore((state) => ({
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
