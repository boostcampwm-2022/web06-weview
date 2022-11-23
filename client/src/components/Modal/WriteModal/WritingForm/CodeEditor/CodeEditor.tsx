import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useWritingStore from "@/store/useWritingStore";
import hljs from "highlight.js";

const CodeEditor = (): JSX.Element => {
  const [highlightedHTML, setHighlightedHTML] = useState("");
  const { code, setCode, language } = useWritingStore((state) => ({
    code: state.code,
    setCode: state.setCode,
    language: state.language,
  }));

  const textRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setHighlightedHTML(
      hljs
        .highlight(code, { language })
        .value.replace(/" "/g, "&nbsp;")
        .replace(/"\n"/g, "<br/>")
    );
  }, [code]);

  const changeCode = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  }, []);

  const createMarkUpCode = useCallback(
    (code: string): { __html: string } => ({
      __html: code,
    }),
    [code]
  );

  const handleScrollChange = useCallback((): void => {
    if (textRef.current !== null && preRef.current !== null) {
      preRef.current.style.height = textRef.current.style.height;
      preRef.current.scrollTop = textRef.current.scrollTop;
    }
  }, [textRef, preRef]);

  return (
    <div className="code-editor">
      <textarea
        ref={textRef}
        onScroll={handleScrollChange}
        value={code}
        onChange={changeCode}
        className="code-editor__textarea"
        autoComplete="false"
        spellCheck="false"
      />
      <pre ref={preRef} className="code-editor__present">
        <code
          dangerouslySetInnerHTML={createMarkUpCode(highlightedHTML)}
        ></code>
      </pre>
    </div>
  );
};

export default CodeEditor;
