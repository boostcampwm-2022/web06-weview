import { ChangeEvent, useCallback, useEffect, useState } from "react";
import domtoimage from "dom-to-image";

import { ONE_SNAPSHOT_LINE_COUNT } from "@/constants/code";
import { IMAGE_OPTIONS } from "@/constants/options";
import useCodeEditorStore from "@/store/useCodeEditorStore";
import { getLineCount } from "@/utils/code";

interface UseCodeEditor {
  code: string;
  language: string;
  handleCodeChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  lineCount: number;
  snapShotEachCode: (idx: number) => Promise<string>;
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

  const snapShotEachCode = async (idx: number): Promise<string> => {
    const $code = document.querySelector(`.chunked-${idx}`);
    const imgUrl = await domtoimage.toJpeg($code as HTMLElement, IMAGE_OPTIONS);
    return await new Promise((resolve, reject) => {
      setImages(imgUrl);
      resolve(imgUrl);
    });
  };

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
    snapShotEachCode,
  };
};

export default useCodeEditor;
