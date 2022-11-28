import { useEffect, useState } from "react";
import hljs from "highlight.js";
import { formatHighlightedHTML } from "@/utils/code";
import { pipe } from "@/utils/functional";

interface HighlightArgs {
  code: string;
  language: string;
}

const useHighlight = (highlightArgs: HighlightArgs): string => {
  const [highlightedHTML, setHighlightedHTML] = useState("");

  useEffect(() => {
    pipe(
      highlightArgs,
      ({ code, language }: HighlightArgs) =>
        hljs.highlight(code, { language }).value,
      formatHighlightedHTML,
      setHighlightedHTML
    );
  }, [highlightArgs]);

  return highlightedHTML;
};

export default useHighlight;
