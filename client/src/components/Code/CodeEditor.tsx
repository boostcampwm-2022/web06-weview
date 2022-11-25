import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import useWritingStore from "@/store/useWritingStore";
import useLineNumbers from "@/hooks/useLineNumbers";
import CodeLines from "@/components/Code/CodeLines";
import useHighlight from "@/hooks/useHighlight";

const CodeEditor = (): JSX.Element => {
  const { code, setCode, language } = useWritingStore((state) => ({
    code: state.code,
    setCode: state.setCode,
    language: state.language,
  }));
  const highlightedHTML = useHighlight(code, language);
  const { setLines } = useLineNumbers();
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  useEffect(() => {
    setLines(code);
  }, [code]);

  const changeCode = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  }, []);

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
        onChange={changeCode}
        className="code__textarea"
        autoComplete="false"
        spellCheck="false"
      />
      <pre ref={preRef} className="code__present">
        <code dangerouslySetInnerHTML={{ __html: highlightedHTML }}></code>
      </pre>
    </div>
  );
};

export default CodeEditor;
