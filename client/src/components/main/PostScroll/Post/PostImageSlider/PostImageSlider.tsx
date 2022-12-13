import React, { useContext, useState } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";
import ProgressiveImage from "@/components/commons/ProgressiveImage/ProgressiveImage";
import codePlaceholder from "@/assets/progressive-image.jpg";
import useCommonModalStore from "@/store/useCommonModalStore";
import ReviewModal from "@/components/main/Modal/ReviewModal/ReviewModal";
import SlideButton from "@/components/main/PostScroll/Post/PostImageSlider/SlideButton/SlideButton";
import { getNextImageStyle } from "@/utils/style";

import "./PostImageSlider.scss";

const PostImageSlider = (): JSX.Element => {
  const { images, id: postId, code, language } = useContext(PostContext);
  const [openModal] = useCommonModalStore((state) => [state.openModal]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState(getNextImageStyle(currentImgIndex));

  const handleNextImage = (): void => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle(getNextImageStyle(currentImgIndex + 1));
  };

  const handlePrevSlide = (): void => {
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle(getNextImageStyle(currentImgIndex - 1));
  };

  const handleClickImage = (): void => {
    openModal(<ReviewModal postId={postId} code={code} language={language} />);
  };

  return (
    <div className="post__image-slider--relative">
      <div className="post__image-slider__wrapper">
        <div className="post__image-slider" style={style}>
          {images.map((image) => (
            <ProgressiveImage
              key={image.src}
              className="post__image-slider--image"
              src={image.src}
              placeholder={codePlaceholder}
              width="100%"
              height="100%"
              alt="이미지 설명"
              handleClickImage={handleClickImage}
            />
          ))}
        </div>
        <SlideButton
          isFirst={currentImgIndex === 0}
          isLast={currentImgIndex === images.length - 1}
          handlePrevImage={handlePrevSlide}
          handleNextImage={handleNextImage}
        />
        {images.length >= 1 && (
          <div className="post__image-slider__dots">
            {images.map((image, idx) => {
              return (
                <div
                  key={image.name}
                  className={`post__image-slider__dots--${
                    currentImgIndex === idx ? "now" : "other"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostImageSlider;
