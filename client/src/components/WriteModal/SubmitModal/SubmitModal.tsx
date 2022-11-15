import React from "react";
import useModalStore from "@/store/useModalStore";

const SubmitModal = (): JSX.Element => {
  const { isOpened, closeModal } = useModalStore((state) => ({
    isOpened: state.isSubmitModalOpened,
    closeModal: state.closeSubmitModal,
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
      <label htmlFor="content">코드에 대한 소개나 질문등을 입력해주세요</label>
      <textarea id="content" className="submit-modal__content" />
      <div className="submit-modal__button">
        <button className="submit-modal__button--close" onClick={closeModal}>
          닫기
        </button>
        <button className="submit-modal__button--register">등록</button>
      </div>
    </section>
  );
};

export default SubmitModal;
