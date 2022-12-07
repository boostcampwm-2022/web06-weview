import { RefObject, useEffect } from "react";

/**
 * ref 외부의 요소를 클릭했을 경우 실행할 콜백 함수를 등록합니다.
 */
const useBackgroundMouseDown = (
  ref: RefObject<HTMLElement>,
  callback?: (event?: Event) => void
): void => {
  useEffect(() => {
    const handleMouseDown = (e: Event): void => {
      if (ref.current === null || ref.current.contains(e.target as Node)) {
        return;
      }
      callback?.(e); // 모달 외부 요소 클릭 시 실행
    };
    // "click" 이벤트로 사용하려면 캡쳐링을 사용해야 함. (혹은 stopPropagation 사용 필요)
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleMouseDown);
    };
  }, [ref, callback]);
};

export default useBackgroundMouseDown;
