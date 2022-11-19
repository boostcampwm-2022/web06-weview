import React, { useCallback } from "react";
import useWritingStore from "@/store/useWritingStore";
import { getHashTags } from "@/utils/regExpression";
import { postWritingsAPI } from "@/apis/post";
import useModalStore from "@/store/useModalStore";

const RegisterButton = (): JSX.Element => {
  const { title, language, code, content, images, resetWritingStore } =
    useWritingStore((state) => ({
      title: state.title,
      language: state.language,
      code: state.code,
      content: state.content,
      images: state.images,
      setImages: state.setImages,
      setLanguage: state.setLanguage,
      resetWritingStore: state.reset,
    }));

  const { closeWritingModal, closeSubmitModal } = useModalStore((state) => ({
    isOpened: state.isSubmitModalOpened,
    closeSubmitModal: state.closeSubmitModal,
    closeWritingModal: state.closeWritingModal,
  }));

  const submitWholeWriting = useCallback(() => {
    postWritingsAPI({
      title,
      content,
      code,
      language: language,
      images: images,
      tags: getHashTags(content),
    })
      .then((res) => {
        alert(res.message);
        resetWritingStore();
        closeWritingModal();
        closeSubmitModal();
      })
      .catch((err: any) => console.error(err));
  }, [title, content, code, language, images]);

  return (
    <button
      onClick={submitWholeWriting}
      className="submit-modal__button--register"
    >
      등록
    </button>
  );
};

export default RegisterButton;
