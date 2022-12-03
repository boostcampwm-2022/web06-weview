import React, { MouseEventHandler } from "react";

import useNav from "@/hooks/useNav";

import "./NavHeader.scss";

const NavHeader = (): JSX.Element => {
  const { handleNavClose } = useNav();

  const businessLogic = (): void => {
    console.log("NavHeader");
  };

  const handleHeaderClick: MouseEventHandler = () => {
    handleNavClose(businessLogic);
  };

  return (
    <section className="nav__sidebar__header">
      <img
        className="nav__sidebar__header__logo"
        alt="WeView Logo"
        onClick={handleHeaderClick}
      />
    </section>
  );
};

export default NavHeader;
