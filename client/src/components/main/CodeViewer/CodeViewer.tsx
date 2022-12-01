import React, { RefObject } from "react";

import useHighlight from "@/hooks/useHighlight";

import "./CodeViewer.scss";

interface CodeViewerProps {
  code: string;
  language: string;
  className: string;
  preRef: RefObject<HTMLPreElement>;
  handleScrollChange?: () => void;
}

const CodeViewer = ({
  code,
  language,
  className,
  preRef,
  handleScrollChange,
}: CodeViewerProps): JSX.Element => {
  const highlightedHTML = useHighlight({ code, language });

  return (
    <pre ref={preRef} className={className} onScroll={handleScrollChange}>
      <code dangerouslySetInnerHTML={{ __html: highlightedHTML }}></code>
    </pre>
  );
};
export default CodeViewer;
