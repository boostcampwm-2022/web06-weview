import React, { useCallback, useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import useLineNumbers from "@/hooks/useLineNumbers";
import CodeLines from "@/components/Code/CodeLines";

interface CodeViewerProps {
  code: string;
  language: string;
}

const CodeViewer = ({ code, language }: CodeViewerProps): JSX.Element => {
  const [highlightedHTML, setHighlightedHTML] = useState("");
  const { setLines } = useLineNumbers();
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  useEffect(() => {
    setHighlightedHTML(
      hljs
        .highlight(code, { language })
        .value.replace(/" "/g, "&nbsp;")
        .replace(/"\n"/g, "<br/>")
    );
    setLines(code);
  }, [code]);

  const createMarkUpCode = useCallback(
    (code: string): { __html: string } => ({
      __html: code,
    }),
    [code]
  );

  const handleScrollChange = useCallback((): void => {
    if (
      lineRef.current !== null &&
      textRef.current !== null &&
      preRef.current !== null
    ) {
      preRef.current.style.height = textRef.current.style.height;
      preRef.current.scrollTop = lineRef.current.scrollTop =
        textRef.current.scrollTop;
    }
  }, [textRef, preRef, lineRef]);

  return (
    <div className="code">
      <CodeLines code={code} lineRef={lineRef} />
      <textarea
        ref={textRef}
        onScroll={handleScrollChange}
        value={code}
        className="code__textarea"
        autoComplete="false"
        spellCheck="false"
        disabled
      />
      <pre ref={preRef} className="code__present">
        <code
          dangerouslySetInnerHTML={createMarkUpCode(highlightedHTML)}
        ></code>
      </pre>
    </div>
  );
};

export default CodeViewer;
