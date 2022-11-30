import { useEffect, useState } from "react";
import hljs from "highlight.js";

import {
  chunkHTML,
  formatHighlightedHTML,
  splitHTML,
  wrapHTML,
} from "@/utils/code";
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
      splitHTML,
      chunkHTML,
      wrapHTML,
      setHighlightedHTML
    );
  }, [highlightArgs.code, highlightArgs.language]);

  return highlightedHTML;
};

export default useHighlight;
