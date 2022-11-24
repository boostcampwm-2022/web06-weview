import React from "react";
import "./ScrollLoader.scss";
import useIntersect from "@/hooks/useIntersect";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface PostLoaderProps {
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
}

const ScrollLoader = ({ onIntersect }: PostLoaderProps): JSX.Element => {
  const intersectRef = useIntersect(onIntersect);

  return (
    <div className="scroll-loader">
      <LoadingSpinner className="scroll-loader__spinner" />
      <div className="scroll-loader__target" ref={intersectRef}></div>
    </div>
  );
};

export default ScrollLoader;
