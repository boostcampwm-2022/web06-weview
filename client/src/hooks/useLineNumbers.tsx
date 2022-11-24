import { useCallback, useState } from "react";
import useWritingStore from "@/store/useWritingStore";

interface UseLineNumbers {
  lineCount: number;
  setLines: (userInput: string) => void;
}

const useLineNumbers = (): UseLineNumbers => {
  const { code } = useWritingStore((state) => ({
    code: state.code,
  }));
  const [lineCount, setLineCount] = useState(0);
  const setLines = useCallback(
    (userInput: string) => {
      setLineCount(userInput.split("\n").length - 1);
    },
    [code]
  );
  return { lineCount, setLines };
};

export default useLineNumbers;
