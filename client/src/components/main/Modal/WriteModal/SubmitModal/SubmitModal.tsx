import React, { useCallback, MouseEvent } from "react";

import useWritingModalStore from "@/store/useWritingModalStore";
import TagInput from "@/components/main/Modal/WriteModal/SubmitModal/TagInput/TagInput";
import TitleInput from "@/components/main/Modal/WriteModal/SubmitModal/TitleInput/TitleInput";

import ContentArea from "./ContentArea/ContentArea";
import RegisterButton from "./RegisterButton/RegisterButton";

import "./SubmitModal.scss";

const SubmitModal = (): JSX.Element => {
  const { isOpened, closeModal } = useWritingModalStore((state) => ({
    isOpened: state.isSubmitModalOpened,
    closeModal: state.closeSubmitModal,
  }));

  const closeSubmitModal = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const clicked = (e.target as HTMLElement).closest(".submit-modal");
    if (clicked === null) {
      closeModal();
    }
  }, []);

  return (
    <div
      className={
        isOpened
          ? "submit-modal__wrapper submit-modal__shown"
          : "submit-modal__wrapper submit-modal__hidden"
      }
      onClick={closeSubmitModal}
    >
      <section className="submit-modal">
        <div className="submit-modal__content">
          <h2 className="submit-modal__header">제출하기</h2>
          <TitleInput />
          <ContentArea />
          <TagInput />
          <div className="submit-modal__button">
            <RegisterButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitModal;
