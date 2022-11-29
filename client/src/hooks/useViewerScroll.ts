import { RefObject, useCallback, useRef } from "react";

interface UseEditorScroll {
  lineRef: RefObject<HTMLDivElement>;
  preRef: RefObject<HTMLPreElement>;
  handleScrollChange: () => void;
}

const useViewerScroll = (): UseEditorScroll => {
  const lineRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const handleScrollChange = useCallback((): void => {
    if (lineRef.current !== null && preRef.current !== null) {
      lineRef.current.scrollTop = preRef.current.scrollTop;
    }
  }, [preRef, lineRef]);
  return { preRef, lineRef, handleScrollChange };
};

export default useViewerScroll;
