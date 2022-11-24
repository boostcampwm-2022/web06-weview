import React, { useMemo } from "react";

import "./PostBar.scss";
import Post from "@/components/PostBar/Post/Post";
import usePostInfiniteScroll from "@/hooks/usePostInfiniteScroll";
import PostLoader from "@/components/PostBar/PostLoader/PostLoader";
import { PostInfo, PostPages } from "@/types/post";
const PostBar = (): JSX.Element => {
  const { data, onIntersect } = usePostInfiniteScroll();

  // 포스트 바에 표시할 포스트 정보 목록
  const postInfos = useMemo(
    (): PostInfo[] =>
      data?.pages.flatMap((postScroll: PostPages) => postScroll.posts) ?? [],
    [data]
  );

  return (
    <div className="post-bar">
      {postInfos.map((postInfo) => (
        <Post key={postInfo.id} postInfo={postInfo} />
      ))}
      <PostLoader onIntersect={onIntersect} />
    </div>
  );
};

export default PostBar;
