import { KeyboardEvent, RefObject } from "react";

import useCodeEditorStore from "@/store/useCodeEditorStore";

interface UseEditorKeyDown {
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const useEditorKeyDown = (
  textAreaRef: RefObject<HTMLTextAreaElement>
): UseEditorKeyDown => {
  const [code, setCode] = useCodeEditorStore((state) => [
    state.code,
    state.setCode,
  ]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Tab") {
      if (textAreaRef?.current !== null && textAreaRef !== undefined) {
        e.preventDefault();
        const start = textAreaRef.current.selectionStart;
        const end = textAreaRef.current.selectionEnd;
        const value = code.substring(0, start) + "  " + code.substring(end);
        textAreaRef.current.value = value;
        textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
          end + 2 - (end - start);
        /* 커서가 뒤로 먼저 가지 않기 위해 value 먼저 변경하고 setCode 실행합니다. */
        setCode(value);
      }
    }
  };
  return { handleKeyDown };
};

export default useEditorKeyDown;
