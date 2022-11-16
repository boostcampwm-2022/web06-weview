import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "@/components/PostBar/Post/Post";

// TODO: 지원's reg 유틸리티에 포함하기
const LINE_COUNT_REGEX = /\r\n|\r|\n/;

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
