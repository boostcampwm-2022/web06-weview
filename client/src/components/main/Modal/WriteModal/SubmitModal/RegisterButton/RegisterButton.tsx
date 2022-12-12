import React from "react";

import useWritingStore from "@/store/useWritingStore";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import { postWritingsAPI, uploadImage } from "@/apis/post";
import useWritingModalStore from "@/store/useWritingModalStore";
import { isEmpty } from "@/utils/typeCheck";
import { fetchPreSignedData } from "@/apis/auth";
import useCommonModalStore from "@/store/useCommonModalStore";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import { queryClient } from "@/react-query/queryClient";

import "./RegisterButton.scss";

const RegisterButton = (): JSX.Element => {
  const essentialWritingStates = useWritingStore((state) => [
    state.title,
    state.content,
  ]);
  const essentialCodeStates = useCodeEditorStore((state) => [
    state.code,
    state.language,
  ]);
  const { images, resetCodeInfo } = useCodeEditorStore((state) => ({
    images: state.images,
    resetCodeInfo: state.reset,
    setImages: state.setImages,
  }));
  const resetWritingStore = useWritingStore((state) => state.reset);
  const closeModal = useCommonModalStore((state) => state.closeModal);
  const { closeSubmitModal } = useWritingModalStore((state) => ({
    isOpened: state.isSubmitModalOpened,
    closeSubmitModal: state.closeSubmitModal,
  }));

  // 제출 불가능 상태 판단
  const isInvalidState = (): boolean =>
    [...essentialWritingStates, ...essentialCodeStates, images].some((state) =>
      isEmpty(state)
    );

  // 이미지들을 S3 에 등록하고 등록된 S3 URL 을 반환
  const uploadImagesToS3 = async (imageUris: string[]): Promise<string[]> => {
    const preSignedS3Urls = await fetchPreSignedData(imageUris.length);
    if (imageUris.length !== preSignedS3Urls.length) {
      throw new Error("이미지 업로드를 위한 URL 을 불러오는데 실패했습니다.");
    }
    return await Promise.all(
      imageUris
        .map((uri, index) => ({
          preSignedData: preSignedS3Urls[index],
          imageUri: uri,
        }))
        .map(uploadImage)
    );
  };

  const uploadPost = async (images: string[]): Promise<void> => {
    const imageUris = await uploadImagesToS3(images);
    const response = await postWritingsAPI(imageUris);
    alert(response.message);
  };

  // 서버에 Post 정보 등록 요청
  const handleSubmit = (): void => {
    void (async () => {
      if (isInvalidState()) {
        return alert("필수 정보들을 입력해주세요!");
      }
      try {
        await uploadPost(images);
        await queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
        resetWritingStore();
        resetCodeInfo();
        closeModal();
        closeSubmitModal();
      } catch (e) {
        console.log(e);
        alert(`전송 중 오류가 발생했습니다.`);
      }
    })();
  };

  return (
    <button onClick={handleSubmit} className="writing-register-button">
      등록
    </button>
  );
};

export default RegisterButton;
