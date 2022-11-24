import React, { useEffect, useState, RefObject } from "react";
import { getLineCount } from "@/utils/code";

interface CodeLinesProps {
  code: string;
  lineRef: RefObject<HTMLDivElement>;
}

const CodeLines = ({ code, lineRef }: CodeLinesProps): JSX.Element => {
  const [lineCount, setLineCount] = useState(0);
  useEffect(() => {
    setLineCount(getLineCount(code));
  }, [code]);

  return (
    <div className="code__lines" ref={lineRef}>
      {Array.from(Array(lineCount).keys()).slice(1).join("\n")}
    </div>
  );
};

export default CodeLines;
