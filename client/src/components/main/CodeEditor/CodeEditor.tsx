import React, { useEffect } from "react";

import useEditorScroll from "@/hooks/useEditorScroll";
import useCodeEditor from "@/hooks/useCodeEditor";
import CodeViewer from "@/components/main/CodeViewer/CodeViewer";

import "./CodeEditor.scss";

const CodeEditor = (): JSX.Element => {
  const { lineRef, textRef, preRef, handleScrollChange } = useEditorScroll();
  const { code, language, lineCount, handleCodeChange, handleKeyDown } =
    useCodeEditor(textRef);
  useEffect(() => {
    textRef.current?.focus();
  }, []);

  return (
    <div className="code">
      <div className="code__lines" ref={lineRef}>
        {Array.from(Array(lineCount + 1).keys())
          .slice(1)
          .join("\n")}
      </div>
      <textarea
        ref={textRef}
        onScroll={handleScrollChange}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        value={code}
        className="code__textarea"
        autoComplete="false"
        spellCheck="false"
      />
      <CodeViewer
        code={code}
        language={language}
        preRef={preRef}
        className={"code__present"}
      />
    </div>
  );
};

export default CodeEditor;
