import React, { Fragment } from "react";

import "./PostBar.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPost } from "@/apis/post";
import Post from "@/components/PostBar/Post/Post";

const PostBar = (): JSX.Element => {
  const { data, status, fetchNextPage } = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => await fetchPost(pageParam),
    {
      getNextPageParam: (lastPost, posts) => lastPost.lastId,
    }
  );

  const fetchNext = (): void => {
    fetchNextPage()
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>error...</div>;

  return (
    <>
      목록:
      {data?.pages.map((postScroll, index) => (
        <Fragment key={index}>
          {postScroll.posts.map((post) => {
            return <Post key={post.id} postInfo={post} />;
          })}
        </Fragment>
      ))}
      <button onClick={fetchNext}>버튼</button>
    </>
  );
};

export default PostBar;
