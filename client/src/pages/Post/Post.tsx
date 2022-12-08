import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import MainNav from "@/components/main/MainNav/MainNav";
import TagRanking from "@/components/main/TagRanking/TagRanking";
import PostScroll from "@/components/main/PostScroll/PostScroll";
import useCommonModalStore from "@/store/useCommonModalStore";
import useSearchStore from "@/store/useSearchStore";

import "./Post.scss";

const Post = (): JSX.Element => {
  const isModalOpened = useCommonModalStore((state) => state.isOpened);
  const searchSingleFilter = useSearchStore(
    (state) => state.searchSingleFilter
  );
  const { postId } = useParams();
  useEffect(() => {
    searchSingleFilter({ postId: postId as string });
  }, []);

  return (
    <div className={isModalOpened ? "hidden-main" : "main"}>
      <MainNav />
      <div className="main__content">
        <PostScroll />
        <TagRanking />
      </div>
    </div>
  );
};

export default Post;
