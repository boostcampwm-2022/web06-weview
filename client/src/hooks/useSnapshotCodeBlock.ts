import domtoimage from "dom-to-image";

import { IMAGE_OPTIONS } from "@/constants/options";
import useCodeEditorStore from "@/store/useCodeEditorStore";

interface UseSnapshotCodeBlock {
  snapshotCodeBlock: (blockIndex: number) => Promise<string>;
}

export const useSnapshotCodeBlock = (): UseSnapshotCodeBlock => {
  const setImages = useCodeEditorStore((state) => state.setImages);
  const snapshotCodeBlock = async (blockIndex: number): Promise<string> => {
    const $code = document.querySelector(`.chunked-${blockIndex}`);
    const imgUrl = await domtoimage.toJpeg($code as HTMLElement, IMAGE_OPTIONS);
    return await new Promise((resolve, reject) => {
      setImages(imgUrl);
      resolve(imgUrl);
    });
  };
  return { snapshotCodeBlock };
};
