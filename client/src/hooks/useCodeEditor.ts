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
  const { code, setCode, language, images, setImages, removeImage } =
    useCodeEditorStore((state) => ({
      code: state.code,
      setCode: state.setCode,
      language: state.language,
      images: state.images,
      setImages: state.setImages,
      removeImage: state.removeImage,
    }));
  const [lineCount, setLineCount] = useState(0);

  const handleCodeChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value);
    },
    []
  );

  useEffect(() => {
    setLineCount(getLineCount(code));
  }, [code]);

  useEffect(() => {
    if (lineCount === 0) return;
    const requiredSnapshotCount = Math.floor(
      (lineCount - 1) / ONE_SNAPSHOT_LINE_COUNT
    );
    if (requiredSnapshotCount <= images.length) {
      for (
        let snapshotCount = images.length;
        snapshotCount >= requiredSnapshotCount;
        snapshotCount--
      ) {
        removeImage(snapshotCount);
      }
      return;
    }
    for (
      let snapshotCount = images.length;
      snapshotCount < requiredSnapshotCount;
      snapshotCount++
    ) {
      const $code = document.querySelector(`.chunked-${snapshotCount + 1}`);
      domtoimage
        .toJpeg($code as HTMLElement, IMAGE_OPTIONS)
        .then((dataUrl: string) => setImages(dataUrl))
        .catch((error: any) => console.error(error));
    }
  }, [lineCount]);

  return {
    code,
    handleCodeChange,
    language,
    lineCount,
  };
};

export default useCodeEditor;
