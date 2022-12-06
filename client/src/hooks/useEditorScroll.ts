import { RefObject, useCallback, useRef } from "react";

interface UseEditorScroll {
  lineRef: RefObject<HTMLDivElement>;
  textRef: RefObject<HTMLTextAreaElement>;
  preRef: RefObject<HTMLPreElement>;
  handleScrollChange: () => void;
}

const useEditorScroll = (): UseEditorScroll => {
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const handleScrollChange = useCallback((): void => {
    if (
      lineRef.current !== null &&
      textRef.current !== null &&
      preRef.current !== null
    ) {
      preRef.current.style.height = textRef.current.style.height;
      preRef.current.scrollTop = lineRef.current.scrollTop =
        textRef.current.scrollTop;
      textRef.current.scrollTop = lineRef.current.scrollTop =
        preRef.current.scrollTop;
      preRef.current.scrollLeft = textRef.current.scrollLeft;
      textRef.current.scrollLeft = preRef.current.scrollLeft;
    }
  }, [textRef, preRef, lineRef]);
  return { textRef, preRef, lineRef, handleScrollChange };
};

export default useEditorScroll;
