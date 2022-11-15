import { RefObject, useCallback, useEffect, useRef } from "react";

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

/**
 * root 원소와 target 원소가 교차 상태인지를 판단하여 조건에 만족할 경우
 * callback 함수를 실행하는 target 원소의 Ref 를 반환합니다.
 */
const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer);
        }
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect;
