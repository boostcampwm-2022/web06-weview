import { RefObject, useEffect } from "react";

/**
 * ref 외부의 요소를 클릭했을 경우 실행할 콜백 함수를 등록합니다.
 */
const useOutsideClickHandler = (
  ref: RefObject<HTMLElement>,
  callback?: (event?: Event) => void
): void => {
  useEffect(() => {
    const handleClickOutside = (e: Event): void => {
      if (ref.current === null || ref.current.contains(e.target as Node)) {
        return;
      }
      callback?.(e); // 모달 외부 요소 클릭 시 실행
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClickHandler;
