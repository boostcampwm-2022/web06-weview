import React, { useCallback, MouseEvent } from "react";
import useModalStore from "@/store/useModalStore";
import ContentArea from "./ContentArea/ContentArea";
import RegisterButton from "./RegisterButton/RegisterButton";
import "./SubmitModal.scss";
import TagInput from "@/components/main/Modal/WriteModal/SubmitModal/TagInput/TagInput";
import TitleInput from "@/components/main/Modal/WriteModal/SubmitModal/TitleInput/TitleInput";

const SubmitModal = (): JSX.Element => {
  const { isOpened, closeModal } = useModalStore((state) => ({
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
        <h2 className="submit-modal__header">제출하기</h2>
        <TitleInput />
        <ContentArea />
        <TagInput />
        <div className="submit-modal__button">
          <RegisterButton />
        </div>
      </section>
    </div>
  );
};

export default SubmitModal;
