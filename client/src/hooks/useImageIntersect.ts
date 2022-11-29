import { useCallback, useEffect, useState } from "react";

interface ImageIntersectResults {
  observeImage: (element: HTMLImageElement) => void;
}

const LOAD = "load";

const useImageIntersect = (): ImageIntersectResults => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.classList.contains(LOAD)) {
        return;
      }
      const image = entry.target as HTMLImageElement;
      image.src = image.dataset.lazysrc ?? "";
      image.addEventListener(
        LOAD,
        (e): void => {
          const target = e.currentTarget as HTMLImageElement;
          if (target === null) {
            return;
          }
          target.classList.add(LOAD);
        },
        { once: true }
      );
    });
  }, []);

  useEffect(() => {
    setObserver(
      new IntersectionObserver(callback, { rootMargin: "0px 1000px" })
    );

    return () => {
      observer?.disconnect();
    };
  }, [callback]);

  const observeImage = useCallback(
    (element: HTMLImageElement): void => {
      if (observer === null || element === null) {
        return;
      }
      observer.observe(element);
    },
    [observer]
  );

  return { observeImage };
};

export default useImageIntersect;
