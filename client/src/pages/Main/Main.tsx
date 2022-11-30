import React from "react";
import MainNav from "@/components/main/MainNav/MainNav";
import PostScroll from "@/components/main/PostScroll/PostScroll";
import useModalStore from "@/store/useModalStore";

const Main = (): JSX.Element => {
  const { isWritingModalOpened } = useModalStore((state) => ({
    isWritingModalOpened: state.isWritingModalOpened,
  }));

  return (
    <div className={isWritingModalOpened ? "hidden-main" : "main"}>
      <MainNav />
      <PostScroll />
    </div>
  );
};

export default Main;
