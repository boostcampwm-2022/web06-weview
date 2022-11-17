import React from "react";
import MainNav from "@/components/MainNav/MainNav";
import PostBar from "@/components/PostBar/PostBar";

const Main = (): JSX.Element => {
  return (
    <div className="main">
      <MainNav />
      <PostBar />
    </div>
  );
};

export default Main;
