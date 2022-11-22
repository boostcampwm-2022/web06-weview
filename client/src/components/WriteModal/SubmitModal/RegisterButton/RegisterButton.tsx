import React, { useCallback } from "react";
import useWritingStore from "@/store/useWritingStore";
import { preventXSS } from "@/utils/regExpression";
import { postWritingsAPI } from "@/apis/post";
import useModalStore from "@/store/useModalStore";
import { isEmpty } from "@/utils/typeCheck";

const RegisterButton = (): JSX.Element => {
  const { title, language, code, content, images, tags, resetWritingStore } =
    useWritingStore((state) => ({
      title: state.title,
      language: state.language,
      code: state.code,
      content: state.content,
      images: state.images,
      tags: state.tags,
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
    // TODO -> 없는 정보 예외 처리
    if (
      isEmpty(title) ||
      isEmpty(content) ||
      isEmpty(language) ||
      isEmpty(code)
    ) {
      alert("필수 정보들을 입력해주세요!");
      return;
    }
    postWritingsAPI({
      category: "리뷰요청",
      title,
      content,
      code: preventXSS(code),
      language: language,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFASlWHLC8RC6TAfXDIbMeUEqB3TfxvuFZg&usqp=CAU",
      ],
      tags,
    })
      .then((res) => {
        alert(res.message);
        resetWritingStore();
        closeWritingModal();
        closeSubmitModal();
      })
      .catch((err: any) => console.error(err));
  }, [title, content, code, language, images, tags]);

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
