import React, { useContext } from "react";

import { PostContext } from "@/components/main/PostScroll/Post/Post";

import "./CodeInfo.scss";

const CodeInfo = (): JSX.Element => {
  const { images, lineCount } = useContext(PostContext);

  return (
    <div className="post__title__code-info">
      {lineCount ?? 0} Lines, {images.length} Images
    </div>
  );
};

export default CodeInfo;
