import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useWritingStore from "@/store/useWritingStore";
import hljs from "highlight.js";
import useLineNumbers from "@/hooks/useLineNumbers";

interface CodeEditorProps {
  isEditable?: boolean;
}

const CodeEditor = ({ isEditable = true }: CodeEditorProps): JSX.Element => {
  const [highlightedHTML, setHighlightedHTML] = useState("");
  const { code, setCode, language } = useWritingStore((state) => ({
    code: state.code,
    setCode: state.setCode,
    language: state.language,
  }));
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
    <div className="code-editor">
      <div className="code-editor__lines" ref={lineRef}>
        {Array.from(Array(100).keys()).slice(1).join("\n")}
      </div>
      <textarea
        ref={textRef}
        onScroll={handleScrollChange}
        value={code}
        onChange={changeCode}
        className="code-editor__textarea"
        autoComplete="false"
        spellCheck="false"
        disabled={!isEditable}
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
