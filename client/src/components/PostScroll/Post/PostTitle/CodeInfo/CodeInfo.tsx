import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "@/components/PostScroll/Post/Post";
import { LINE_COUNT_REGEX } from "@/utils/regExpression";

const CodeInfo = (): JSX.Element => {
  const { code, images } = useContext(PostContext);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    setLineCount(code.split(LINE_COUNT_REGEX).length);
  }, [code]);

  return (
    <div className="post__title--code-info">
      {lineCount ?? 0} Lines, {images.length} Images
    </div>
  );
};

export default CodeInfo;
