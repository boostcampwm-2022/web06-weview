import React, { useContext } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";
import ProgressiveImage from "@/components/commons/ProgressiveImage/ProgressiveImage";
import codePlaceholder from "@/assets/progressive-image.jpg";
import useCommonModalStore from "@/store/useCommonModalStore";
import ReviewModal from "@/components/main/Modal/ReviewModal/ReviewModal";

import "./PostImageSlider.scss";

const PostImageSlider = (): JSX.Element => {
  const { images, id: postId, code, language } = useContext(PostContext);
  const [openModal] = useCommonModalStore((state) => [state.openModal]);

  const handleClickImage = (): void => {
    openModal(<ReviewModal postId={postId} code={code} language={language} />);
  };

  return (
    <div className="post__image-slider">
      <ProgressiveImage
        className="post__image-slider--image"
        src={images[0].src}
        placeholder={codePlaceholder}
        width="100%"
        height="100%"
        alt="이미지 설명"
        handleClickImage={handleClickImage}
      />
    </div>
  );
};

export default PostImageSlider;
