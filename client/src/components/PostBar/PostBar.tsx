import React, { useMemo, useRef } from "react";

import "./PostBar.scss";
import Post from "@/components/PostBar/Post/Post";
import usePostInfiniteScroll from "@/hooks/usePostInfiniteScroll";
import useIntersect from "@/hooks/useIntersect";

const PostBar = (): JSX.Element => {
  const { data, onIntersect } = usePostInfiniteScroll({ size: 5 });
  const intersectRef = useIntersect(onIntersect);
  const boxRef = useRef<HTMLDivElement>(null);

  // 포스트 바에 표시할 포스트 정보 목록
  const postInfos = useMemo(
    () =>
      data != null ? data.pages.flatMap((postScroll) => postScroll.posts) : [],
    [data]
  );

  return (
    <div className="post-bar" ref={boxRef}>
      {postInfos.map((postInfo) => (
        <Post key={postInfo.id} postInfo={postInfo} boxRef={boxRef} />
      ))}
      <div className="post-bar__target" ref={intersectRef} />
    </div>
  );
};

export default PostBar;
