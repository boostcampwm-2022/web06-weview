import React from "react";
import Filter from "@/components/MainNav/Filter/Filter";
import Menu from "@/components/MainNav/Menu/Menu";
import Profile from "@/components/MainNav/Profile/Profile";

const MainNav = (): JSX.Element => {
  return (
    <nav className="nav">
      <Filter />
      <Menu />
      <Profile />
    </nav>
  );
};

export default MainNav;
