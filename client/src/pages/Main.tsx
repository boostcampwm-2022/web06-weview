import React from "react";
import MainNav from "@/components/MainNav/MainNav";
import PostBar from "@/components/PostBar/PostBar";
import WriteModal from "@/components/WriteModal/WriteModal";

const Main = (): JSX.Element => {
  return (
    <>
      <MainNav />
      <PostBar />
      <WriteModal />
    </>
  );
};

export default Main;
