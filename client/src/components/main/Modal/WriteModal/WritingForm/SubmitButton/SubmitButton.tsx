import React, { FormEvent, useCallback } from "react";
import useModalStore from "@/store/useModalStore";
import "./SubmitButton.scss";

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
