import React from "react";
import usePostInfiniteScroll from "@/hooks/usePostInfiniteScroll";
import useIntersect from "@/hooks/useIntersect";

import "./PostLoader.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const PostLoader = (): JSX.Element => {
  const { onIntersect } = usePostInfiniteScroll();
  const intersectRef = useIntersect(onIntersect);

  return (
    <div className="post-loader">
      <LoadingSpinner className="post-loader__spinner" />
      <div className="post-loader__target" ref={intersectRef}></div>
    </div>
  );
};

export default PostLoader;
