import React from "react";
import Filter from "@/components/MainNav/Filter/Filter";
import Menu from "@/components/MainNav/Menu/Menu";
import Profile from "@/components/MainNav/Profile/Profile";
import useModalStore from "@/store/useModalStore";

const MainNav = (): JSX.Element => {
  const { isWritingModalOpened } = useModalStore((state) => ({
    isWritingModalOpened: state.isWritingModalOpened,
  }));

  return (
    <nav className={isWritingModalOpened ? "hidden-nav" : "nav"}>
      <Filter />
      <Menu />
      <Profile />
    </nav>
  );
};

export default MainNav;
