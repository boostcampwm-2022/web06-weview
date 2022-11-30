import React from "react";

import NavHeader from "@/components/main/MainNav/NavHeader/NavHeader";
import NavMenus from "@/components/main/MainNav/NavMenus/NavMenus";
import NavFooter from "@/components/main/MainNav/NavFooter/NavFooter";
import useNavStore from "@/store/useNavStore";

import "./MainNav.scss";

const MainNav = (): JSX.Element => {
  const [isOpened] = useNavStore((state) => [state.isOpened]);

  return (
    <nav className={`nav ${isOpened ? "opened" : "closed"}`}>
      <NavHeader />
      <NavMenus />
      <NavFooter />
    </nav>
  );
};

export default MainNav;
