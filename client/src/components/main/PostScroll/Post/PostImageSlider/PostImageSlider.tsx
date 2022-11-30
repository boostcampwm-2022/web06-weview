import React, { useContext } from "react";
import { PostContext } from "@/components/PostScroll/Post/Post";
import ProgressiveImage from "@/components/commons/ProgressiveImage/ProgressiveImage";
import codePlaceholder from "@/assets/progressive-image.jpg";

const PostImageSlider = (): JSX.Element => {
  const { images } = useContext(PostContext);

  return (
    <div className="post__image-slider">
      <ProgressiveImage
        className="post__image-slider--image"
        src={images[0].src}
        placeholder={codePlaceholder}
        width="100%"
        height="100%"
        alt="이미지 설명"
      />
    </div>
  );
};

export default PostImageSlider;
