import React, { useMemo } from "react";

import "./PostBar.scss";
import Post from "@/components/PostBar/Post/Post";
import usePostInfiniteScroll from "@/hooks/usePostInfiniteScroll";
import useIntersect from "@/hooks/useIntersect";
import useRelativeSize from "@/hooks/useRelativeSize";

const PostBar = (): JSX.Element => {
  const { data, onIntersect } = usePostInfiniteScroll({ size: 5 });
  const { windowSize } = useRelativeSize({
    minWidth: 400,
    minHeight: 616,
    heightRatio: 616 / 400,
  });
  const ref = useIntersect(onIntersect);

  // 포스트 바에 표시할 포스트 정보 목록
  const postInfos = useMemo(
    () =>
      data != null ? data.pages.flatMap((postScroll) => postScroll.posts) : [],
    [data]
  );

  return (
    <div
      className="post-bar"
      style={{ width: windowSize.width, height: windowSize.height }}
    >
      {postInfos.map((postInfo) => (
        <Post key={postInfo.id} postInfo={postInfo} />
      ))}
      <div className="post-bar__target" ref={ref} />
    </div>
  );
};

export default PostBar;
