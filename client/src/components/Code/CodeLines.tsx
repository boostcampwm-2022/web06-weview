import React, { useEffect, useState, RefObject } from "react";
import { getLineCount } from "@/utils/code";
import domtoimage from "dom-to-image";
import useWritingStore from "@/store/useWritingStore";
import { ONE_SNAP_SHOT_LINE_COUNT } from "@/constants/code";
import { IMAGE_OPTIONS } from "@/constants/options";

interface CodeLinesProps {
  code: string;
  lineRef: RefObject<HTMLDivElement>;
}

const CodeLines = ({ code, lineRef }: CodeLinesProps): JSX.Element => {
  const [lineCount, setLineCount] = useState(0);
  const [setImages] = useWritingStore((state) => [state.setImages]);

  useEffect(() => {
    setLineCount(getLineCount(code));
  }, [code]);

  useEffect(() => {
    if (lineCount === 0 || lineCount % ONE_SNAP_SHOT_LINE_COUNT !== 0) return;

    const $code = document.querySelector(
      `.chunked-${lineCount / ONE_SNAP_SHOT_LINE_COUNT}`
    );
    domtoimage
      .toJpeg($code as HTMLElement, IMAGE_OPTIONS)
      .then((dataUrl: string) => setImages(dataUrl))
      .catch((error: any) => console.error(error));
  }, [lineCount]);

  return (
    <div className="code__lines" ref={lineRef}>
      {Array.from(Array(lineCount).keys()).slice(1).join("\n")}
    </div>
  );
};

export default CodeLines;
