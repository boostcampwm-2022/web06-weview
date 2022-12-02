import React from "react";

import MainNav from "@/components/main/MainNav/MainNav";
import PostScroll from "@/components/main/PostScroll/PostScroll";
import useModalStore from "@/store/useModalStore";
import TagRanking from "@/components/main/TagRanking/TagRanking";

import "./Main.scss";

const Main = (): JSX.Element => {
  const { isWritingModalOpened } = useModalStore((state) => ({
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
