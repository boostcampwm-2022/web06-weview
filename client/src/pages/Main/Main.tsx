import React from "react";

import MainNav from "@/components/main/MainNav/MainNav";
import PostScroll from "@/components/main/PostScroll/PostScroll";
import useModalStore from "@/store/useModalStore";
import TagRank from "@/components/main/TagRank/TagRank";

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
        <TagRank />
      </div>
    </div>
  );
};

export default Main;
