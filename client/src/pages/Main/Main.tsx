import React from "react";

import MainNav from "@/components/main/MainNav/MainNav";
import PostScroll from "@/components/main/PostScroll/PostScroll";
import useWritingModalStore from "@/store/useWritingModalStore";
import TagRanking from "@/components/main/TagRanking/TagRanking";

import "./Main.scss";

const Main = (): JSX.Element => {
  const { isWritingModalOpened } = useWritingModalStore((state) => ({
    isWritingModalOpened: state.isWritingModalOpened,
  }));

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

export default Main;
