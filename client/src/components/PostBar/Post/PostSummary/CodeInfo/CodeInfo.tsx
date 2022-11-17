import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";
import { LINE_COUNT_REGEX } from "@/utils/regExpression";

const CodeInfo = (): JSX.Element => {
  const { code, imageUrls } = useContext(PostContext);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    setLineCount(code.split(LINE_COUNT_REGEX).length);
  }, [code]);

  return (
    <div className="post__info__code-info">
      {lineCount ?? 0} Lines, {imageUrls.length} Images
    </div>
  );
};

export default CodeInfo;
