import React from "react";
import Filter from "@/components/main/MainNav/Filter/Filter";
import Menu from "@/components/main/MainNav/Menu/Menu";
import Profile from "@/components/main/MainNav/Profile/Profile";
import "./MainNav.scss";

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
