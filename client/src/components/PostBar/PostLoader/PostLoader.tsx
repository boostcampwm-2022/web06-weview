import React from "react";
import "./PostLoader.scss";
import useIntersect from "@/hooks/useIntersect";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface PostLoaderProps {
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
}

const PostLoader = ({ onIntersect }: PostLoaderProps): JSX.Element => {
  const intersectRef = useIntersect(onIntersect);

  return (
    <div className="post-loader">
      <LoadingSpinner className="post-loader__spinner" />
      <div className="post-loader__target" ref={intersectRef}></div>
    </div>
  );
};

export default PostLoader;
