import React, { useCallback } from "react";
import useWritingStore from "@/store/useWritingStore";
import { getHashTags } from "@/utils/regExpression";
import { postWritingsAPI } from "@/apis/post";
import useModalStore from "@/store/useModalStore";

const dummyImages = [
  "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1576836165612-8bc9b07e7778?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
];

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
      language: "javascript",
      images: [dummyImages[0]],
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
