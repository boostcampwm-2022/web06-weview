import React from "react";

import useImageIntersect from "@/hooks/useImageIntersect";

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

  return (
    <img
      ref={observeImage}
      className={`progressive-image ${className}`}
      src={placeholder}
      data-lazysrc={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default ProgressiveImage;
