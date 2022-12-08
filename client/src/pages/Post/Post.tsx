import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import MainNav from "@/components/main/MainNav/MainNav";
import TagRanking from "@/components/main/TagRanking/TagRanking";
import useWritingModalStore from "@/store/useWritingModalStore";
import useSearchStore from "@/store/useSearchStore";
import PostScroll from "@/components/main/PostScroll/PostScroll";

import "./Post.scss";

const Post = (): JSX.Element => {
  const [isWritingModalOpened] = useWritingModalStore((state) => [
    state.isWritingModalOpened,
  ]);
  const searchSingleFilter = useSearchStore(
    (state) => state.searchSingleFilter
  );
  const { postId } = useParams();
  useEffect(() => {
    searchSingleFilter({ postId: postId as string });
  }, []);

  return (
    <div className={isWritingModalOpened ? "hidden-main" : "main"}>
      <MainNav />
      <div className="main__content">
        <PostScroll />
        <TagRanking />
      </div>
    </div>
  );
};

export default Post;
