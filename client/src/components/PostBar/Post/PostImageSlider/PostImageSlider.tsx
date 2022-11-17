import React, { useContext, useLayoutEffect, useState } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";
import { isEmpty } from "@/utils/typeCheck";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const PostImageSlider = (): JSX.Element => {
  const { images } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (isEmpty(images)) {
      return;
    }
    setIsLoading(false);
  }, [images]);

  return (
    <div className="post__image-slider">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <img className="post__image-slider--image" src={images[0].src} />
      )}
    </div>
  );
};

export default PostImageSlider;
