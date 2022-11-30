import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "@/components/main/PostScroll/Post/Post";
import { LINE_COUNT_REGEX } from "@/utils/regExpression";
import "./CodeInfo.scss";

const CodeInfo = (): JSX.Element => {
  const { code, images } = useContext(PostContext);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    setLineCount(code.split(LINE_COUNT_REGEX).length);
  }, [code]);

  return (
    <div className="post__title__code-info">
      {lineCount ?? 0} Lines, {images.length} Images
    </div>
  );
};

export default CodeInfo;
