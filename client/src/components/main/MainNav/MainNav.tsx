import React from "react";

import NavHeader from "@/components/main/MainNav/NavHeader/NavHeader";
import NavMenus from "@/components/main/MainNav/NavMenus/NavMenus";
import NavFooter from "@/components/main/MainNav/NavFooter/NavFooter";
import NavContent from "@/components/main/MainNav/NavContent/NavContent";
import useNav from "@/hooks/useNav";

import "./MainNav.scss";

const MainNav = (): JSX.Element => {
  const { isOpened } = useNav(); // Nav 를 통해 다른 창이 열려 있는지

  return (
    <div className={`nav ${isOpened ? "opened" : "closed"}`}>
      <nav className="nav__sidebar">
        <NavHeader />
        <NavMenus />
        <NavFooter />
      </nav>
      <NavContent />
    </div>
  );
};

export default MainNav;
