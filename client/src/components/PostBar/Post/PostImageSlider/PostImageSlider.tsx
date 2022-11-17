import React, { useContext } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";

const PostImageSlider = (): JSX.Element => {
  const { imageUrls } = useContext(PostContext);

  return (
    <div className="post__image-slider">
      <img className="post__image-slider--image" src={imageUrls[0]} />
    </div>
  );
};

export default PostImageSlider;
