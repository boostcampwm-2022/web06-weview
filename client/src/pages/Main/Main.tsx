import React from "react";
import MainNav from "@/components/MainNav/MainNav";
import PostBar from "@/components/PostBar/PostBar";
import useModalStore from "@/store/useModalStore";

const Main = (): JSX.Element => {
  const { isWritingModalOpened } = useModalStore((state) => ({
    isWritingModalOpened: state.isWritingModalOpened,
  }));

  return (
    <div className={isWritingModalOpened ? "hidden-main" : "main"}>
      <MainNav />
      <PostBar />
    </div>
  );
};

export default Main;
