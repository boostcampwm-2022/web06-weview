import React from "react";

import useIntersect from "@/hooks/useIntersect";
import LoadingSpinner from "@/components/commons/LoadingSpinner/LoadingSpinner";

import "./ScrollLoader.scss";

interface PostLoaderProps {
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
  spinner?: boolean;
  onLoad?: boolean;
}

const ScrollLoader = ({
  onIntersect,
  spinner = true,
  onLoad = true,
}: PostLoaderProps): JSX.Element => {
  const intersectRef = useIntersect(onIntersect);

  return (
    <div className="scroll-loader">
      {spinner && onLoad && (
        <LoadingSpinner className="scroll-loader__spinner" />
      )}
      <div className="scroll-loader__target" ref={intersectRef}></div>
    </div>
  );
};

export default ScrollLoader;
