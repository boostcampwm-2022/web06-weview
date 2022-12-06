import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import useNav from "@/hooks/useNav";

import "./NavHeader.scss";

const NavHeader = (): JSX.Element => {
  const { handleNavClose } = useNav();
  const navigate = useNavigate();

  const handleHeaderClick: MouseEventHandler = () => {
    handleNavClose();
    navigate("/");
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
