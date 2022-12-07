import React, { useCallback, useContext } from "react";

import useImageIntersect from "@/hooks/useImageIntersect";
import useCommonModalStore from "@/store/useCommonModalStore";
import ReviewModal from "@/components/main/Modal/ReviewModal/ReviewModal";
import { PostContext } from "@/components/main/PostScroll/Post/Post";

interface ProgressiveImageProps {
  className: string;
  src: string;
  placeholder: string;
  width: number | "100%";
  height: number | "100%";
  alt: string;
}

const ProgressiveImage = ({
  className,
  src,
  placeholder,
  width,
  height,
  alt,
}: ProgressiveImageProps): JSX.Element => {
  const { observeImage } = useImageIntersect();
  const { id: postId, code, language } = useContext(PostContext);
  const [openModal] = useCommonModalStore((state) => [state.openModal]);

  const handleOpenReviewModal = useCallback(() => {
    openModal(<ReviewModal postId={postId} code={code} language={language} />);
  }, [openModal]);

  return (
    <img
      ref={observeImage}
      className={`progressive-image ${className}`}
      src={placeholder}
      onClick={handleOpenReviewModal}
      data-lazysrc={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default ProgressiveImage;
