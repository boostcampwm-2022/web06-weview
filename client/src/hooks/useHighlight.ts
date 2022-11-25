import { useEffect, useState } from "react";
import hljs from "highlight.js";
import { formatHighlightedHTML } from "@/utils/code";
import { pipe } from "@/utils/functional";

interface HighlightArgs {
  code: string;
  language: string;
}

const useHighlight = (code: string, language: string): string => {
  const [highlightedHTML, setHighlightedHTML] = useState("");

  useEffect(() => {
    pipe(
      { code, language },
      ({ code, language }: HighlightArgs) =>
        hljs.highlight(code, { language }).value,
      formatHighlightedHTML,
      setHighlightedHTML
    );
  }, [code]);

  return highlightedHTML;
};

export default useHighlight;
