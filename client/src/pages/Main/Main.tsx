import React from "react";

import MainNav from "@/components/main/MainNav/MainNav";
import PostScroll from "@/components/main/PostScroll/PostScroll";
import useCommonModalStore from "@/store/useCommonModalStore";
import TagRanking from "@/components/main/TagRanking/TagRanking";

import "./Main.scss";

const Main = (): JSX.Element => {
  const isModalOpened = useCommonModalStore((state) => state.isOpened);

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

export default Main;
