import React, { useContext } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";

const PostImageSlider = (): JSX.Element => {
  const { images } = useContext(PostContext);

  return (
    <div className="post__image-slider">
      <img className="post__image-slider--image" src={images[0].src} />
    </div>
  );
};

export default PostImageSlider;
