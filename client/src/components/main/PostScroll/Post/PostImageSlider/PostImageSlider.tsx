import React, { TouchEvent, useContext, useRef, useState } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";
import ProgressiveImage from "@/components/commons/ProgressiveImage/ProgressiveImage";
import codePlaceholder from "@/assets/progressive-image.jpg";
import useCommonModalStore from "@/store/useCommonModalStore";
import ReviewModal from "@/components/main/Modal/ReviewModal/ReviewModal";
import SlideButton from "@/components/main/PostScroll/Post/PostImageSlider/SlideButton/SlideButton";
import { get3dImageTransformStyle, getNextImageStyle } from "@/utils/style";

import "./PostImageSlider.scss";

const PostImageSlider = (): JSX.Element => {
  const { images, id: postId, code, language } = useContext(PostContext);
  const [openModal] = useCommonModalStore((state) => [state.openModal]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState(getNextImageStyle(currentImgIndex));
  const [touchedX, setTouchedX] = useState({ start: 0, end: 0 });

  const handlePrevImage = (): void => {
    if (currentImgIndex === 0) {
      setStyle(getNextImageStyle(currentImgIndex));
      return;
    }
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle(getNextImageStyle(currentImgIndex - 1));
  };

  const handleNextImage = (): void => {
    if (currentImgIndex === images.length - 1) {
      setStyle(getNextImageStyle(currentImgIndex));
      return;
    }
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle(getNextImageStyle(currentImgIndex + 1));
  };

  const handleClickImage = (): void => {
    openModal(<ReviewModal postId={postId} code={code} language={language} />);
  };

  const handleTouchStartWrapper = (e: TouchEvent<HTMLDivElement>): void => {
    setTouchedX({
      ...touchedX,
      start: e.touches[0].pageX,
    });
  };

  const handleMoveWrapper = (e: TouchEvent<HTMLDivElement>): void => {
    if (imageRef?.current != null) {
      const current = imageRef.current.clientWidth * currentImgIndex;
      // e.targetTouches[0] 은 처음 터치한 표면 정보 즉 마우스 이동한만큼 이미지 이동
      const result = -current + (e.targetTouches[0].pageX - touchedX.start);
      setStyle(get3dImageTransformStyle(result));
    }
  };

  const handleTouchEndWrapper = (e: TouchEvent<HTMLDivElement>): void => {
    const end = e.changedTouches[0].pageX;
    const isMoveRight = touchedX.start > end;
    isMoveRight ? handleNextImage() : handlePrevImage();
    setTouchedX({
      ...touchedX,
      end,
    });
  };

  return (
    <div className="post__image-slider--relative">
      <div
        className="post__image-slider__wrapper"
        onTouchStart={handleTouchStartWrapper}
        onTouchMove={handleMoveWrapper}
        onTouchEnd={handleTouchEndWrapper}
      >
        <div ref={imageRef} className="post__image-slider" style={style}>
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
          handlePrevImage={handlePrevImage}
          handleNextImage={handleNextImage}
        />
        {images.length > 1 && (
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
