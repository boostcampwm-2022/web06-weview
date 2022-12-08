import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
  RefObject,
} from "react";
import domtoimage from "dom-to-image";

import { ONE_SNAPSHOT_LINE_COUNT } from "@/constants/code";
import { IMAGE_OPTIONS } from "@/constants/options";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import { getLineCount } from "@/utils/code";

interface UseCodeEditor {
  code: string;
  language: string;
  handleCodeChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  lineCount: number;
}

const useCodeEditor = (
  textAreaRef: RefObject<HTMLTextAreaElement>
): UseCodeEditor => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Tab") {
      if (textAreaRef.current !== null) {
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

  const handleCodeChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value);
    },
    []
  );

  useEffect(() => {
    setLineCount(getLineCount(code));
  }, [code]);

  const removeUselessImage = useCallback(
    (requiredSnapshotCount: number) => {
      for (
        let imageIndex = images.length;
        imageIndex >= requiredSnapshotCount;
        imageIndex--
      ) {
        removeImage(imageIndex);
      }
    },
    [images]
  );

  const snapShotCode = useCallback(
    (requiredSnapshotCount: number) => {
      const domToImagePromises = [];
      for (
        let imageIndex = images.length;
        imageIndex < requiredSnapshotCount;
        imageIndex++
      ) {
        const $code = document.querySelector(`.chunked-${imageIndex + 1}`);
        domToImagePromises.push(
          domtoimage.toJpeg($code as HTMLElement, IMAGE_OPTIONS)
        );
      }
      Promise.all(domToImagePromises)
        .then((dataUrls: string[]) => {
          dataUrls.forEach((dataUrl) => setImages(dataUrl));
        })
        .catch((error: any) => console.error(error));
    },
    [images]
  );

  useEffect(() => {
    if (lineCount === 0) return;
    const requiredSnapshotCount = Math.floor(
      (lineCount - 1) / ONE_SNAPSHOT_LINE_COUNT
    );
    requiredSnapshotCount <= images.length
      ? removeUselessImage(requiredSnapshotCount)
      : snapShotCode(requiredSnapshotCount);
  }, [lineCount]);

  return {
    code,
    handleCodeChange,
    language,
    lineCount,
    handleKeyDown,
  };
};

export default useCodeEditor;
