import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import useWritingStore from "@/store/useWritingStore";
import hljs from "highlight.js";

const CodeEditor = (): JSX.Element => {
  const [highlightedCode, setHighlightedCode] = useState("");
  const { code, setCode } = useWritingStore((state) => ({
    code: state.code,
    setCode: state.setCode,
  }));
  useEffect(() => {
    setHighlightedCode(
      hljs.highlightAuto(code).value.replace(/" "/g, "&nbsp; ")
    );
  }, []);

  const changeCode = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setHighlightedCode(
      hljs.highlightAuto(e.target.value).value.replace(/" "/g, "&nbsp; ")
    );
  }, []);

  const createMarkUpCode = (code: string): { __html: string } => ({
    __html: code,
  });

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
          dangerouslySetInnerHTML={createMarkUpCode(highlightedCode)}
        ></code>
      </pre>
    </div>
  );
};

export default CodeEditor;
