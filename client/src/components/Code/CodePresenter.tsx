import React, { ChangeEvent, useCallback, useContext, useEffect } from "react";
import CodeLines from "@/components/Code/CodeLines";
import useHighlight from "@/hooks/useHighlight";
import useEditorScroll from "@/hooks/useEditorScroll";
import useLineNumbers from "@/hooks/useLineNumbers";
import { CodeContext } from "@/components/Code/CodeContainer";

const CodePresenter = (): JSX.Element => {
  const { code, setCode, language, isEditable } = useContext(CodeContext);
  const highlightedHTML = useHighlight(code, language);
  const { lineRef, textRef, preRef, handleScrollChange } = useEditorScroll();
  const { setLines } = useLineNumbers();

  useEffect(() => {
    setLines(code);
  }, [code]);

  const handleCodeChange = isEditable
    ? useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        if (setCode !== null) {
          setCode(e.target.value);
        }
      }, [])
    : undefined;

  return (
    <div className="code">
      <CodeLines code={code} lineRef={lineRef} />
      <textarea
        ref={textRef}
        onScroll={handleScrollChange}
        onChange={handleCodeChange}
        value={code}
        className="code__textarea"
        autoComplete="false"
        spellCheck="false"
        disabled={!isEditable}
      />
      <pre ref={preRef} className="code__present">
        <code dangerouslySetInnerHTML={{ __html: highlightedHTML }}></code>
      </pre>
    </div>
  );
};

export default CodePresenter;
