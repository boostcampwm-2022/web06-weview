import React, { useMemo } from "react";

import Post from "@/components/main/PostScroll/Post/Post";
import usePostInfiniteScroll from "@/hooks/usePostInfiniteScroll";
import ScrollLoader from "@/components/main/ScrollLoader/ScrollLoader";
import { PostInfo, PostPages } from "@/types/post";
import NoPost from "@/components/main/PostScroll/NoPost/NoPost";

import "./PostScroll.scss";

const PostScroll = (): JSX.Element => {
  const { data, onIntersect, hasNextPage } = usePostInfiniteScroll();

  // 포스트 바에 표시할 포스트 정보 목록
  const postInfos = useMemo(
    (): PostInfo[] =>
      data?.pages.flatMap((postScroll: PostPages) => postScroll.posts) ?? [],
    [data]
  );

  if (data !== undefined && postInfos.length === 0) {
    /* 데이터를 불러왔지만 길이가 0인 경우 */
    return <NoPost />;
  }

  return (
    <div className="post-scroll">
      {postInfos.map((postInfo) => (
        <Post key={postInfo.id} postInfo={postInfo} />
      ))}
      <ScrollLoader onIntersect={onIntersect} onLoad={hasNextPage} />
    </div>
  );
};

export default PostScroll;
