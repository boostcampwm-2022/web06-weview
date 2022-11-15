import React from "react";
import useModalStore from "@/store/useModalStore";
import ContentArea from "./ContentArea/ContentArea";
import CloseButton from "./CloseButton/CloseButton";
import RegisterButton from "./RegisterButton/RegisterButton";

const SubmitModal = (): JSX.Element => {
  const { isOpened } = useModalStore((state) => ({
    isOpened: state.isSubmitModalOpened,
  }));

  return (
    <section
      className={
        isOpened
          ? "submit-modal submit-modal__shown"
          : "submit-modal submit-modal__hidden"
      }
    >
      <h2 className="submit-modal__header">제출하기</h2>
      <ContentArea />
      <div className="submit-modal__button">
        <CloseButton />
        <RegisterButton />
      </div>
    </section>
  );
};

export default SubmitModal;
