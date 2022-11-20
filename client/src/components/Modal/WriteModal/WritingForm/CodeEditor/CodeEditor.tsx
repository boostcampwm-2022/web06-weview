import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import useWritingStore from "@/store/useWritingStore";
import hljs from "highlight.js";
import useLineNumbers from "@/hooks/useLineNumbers";

const CodeEditor = (): JSX.Element => {
  const [highlightedHTML, setHighlightedHTML] = useState("");
  const { lineCount, setLines } = useLineNumbers();
  const { code, setCode, language } = useWritingStore((state) => ({
    code: state.code,
    setCode: state.setCode,
    language: state.language,
  }));
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

  return (
    <div className="code-editor">
      <textarea
        value={code}
        onChange={changeCode}
        className="code-editor__textarea"
        autoComplete="false"
        spellCheck="false"
      />
      <pre className="code-editor__present">
        <code
          dangerouslySetInnerHTML={createMarkUpCode(highlightedHTML)}
        ></code>
      </pre>
    </div>
  );
};

export default CodeEditor;
