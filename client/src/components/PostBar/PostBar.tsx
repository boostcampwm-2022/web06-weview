import React, { useMemo, useRef } from "react";

import "./PostBar.scss";
import Post from "@/components/PostBar/Post/Post";
import usePostInfiniteScroll from "@/hooks/usePostInfiniteScroll";
import PostLoader from "@/components/PostBar/PostLoader/PostLoader";
import { PostInfo } from "@/types/post";

const PostBar = (): JSX.Element => {
  const { data } = usePostInfiniteScroll();
  const boxRef = useRef<HTMLDivElement>(null);

  // 포스트 바에 표시할 포스트 정보 목록
  const postInfos = useMemo(
    (): PostInfo[] =>
      data?.pages.flatMap((postScroll) => postScroll.posts) ?? [],
    [data]
  );

  return (
    <div className="post-bar" ref={boxRef}>
      {postInfos.map((postInfo) => (
        <Post key={postInfo.id} postInfo={postInfo} />
      ))}
      <PostLoader />
    </div>
  );
};

export default PostBar;
