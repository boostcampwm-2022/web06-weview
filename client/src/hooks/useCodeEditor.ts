import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ONE_SNAPSHOT_LINE_COUNT } from "@/constants/code";
import domtoimage from "dom-to-image";
import { IMAGE_OPTIONS } from "@/constants/options";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import { getLineCount } from "@/utils/code";

interface UseCodeEditor {
  code: string;
  language: string;
  handleCodeChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  lineCount: number;
}

const useCodeEditor = (): UseCodeEditor => {
  const { code, setCode, language, setImages } = useCodeEditorStore(
    (state) => ({
      code: state.code,
      setCode: state.setCode,
      language: state.language,
      setImages: state.setImages,
    })
  );
  const [lineCount, setLineCount] = useState(0);

  const handleCodeChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value);
    },
    []
  );

  useEffect(() => {
    setLineCount(getLineCount(code) + 1);
  }, [code]);

  useEffect(() => {
    if (lineCount === 0 || lineCount % ONE_SNAPSHOT_LINE_COUNT !== 0) return;

    const $code = document.querySelector(
      `.chunked-${lineCount / ONE_SNAPSHOT_LINE_COUNT}`
    );
    domtoimage
      .toJpeg($code as HTMLElement, IMAGE_OPTIONS)
      .then((dataUrl: string) => setImages(dataUrl))
      .catch((error: any) => console.error(error));
  }, [lineCount]);

  return {
    code,
    handleCodeChange,
    language,
    lineCount,
  };
};

export default useCodeEditor;
