import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import MainNav from "@/components/main/MainNav/MainNav";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import { getPostItem } from "@/apis/post";
import PostItem from "@/components/main/PostScroll/Post/Post";
import TagRanking from "@/components/main/TagRanking/TagRanking";
import { PostInfo } from "@/types/post";
import LoadingSpinner from "@/components/commons/LoadingSpinner/LoadingSpinner";
import useModalStore from "@/store/useModalStore";

import "./Post.scss";

const Post = (): JSX.Element => {
  const [isWritingModalOpened] = useModalStore((state) => [
    state.isWritingModalOpened,
  ]);
  const { postId } = useParams();
  const { isLoading, data } = useQuery(
    [QUERY_KEYS.POSTS],
    async () => await getPostItem(postId as string)
  );

  return (
    <div className={isWritingModalOpened ? "hidden-main" : "main"}>
      <MainNav />
      <div className="main__content">
        <div className="post-item-box">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <PostItem postInfo={data?.post as PostInfo} />
          )}
        </div>
        <TagRanking />
      </div>
    </div>
  );
};

export default Post;
