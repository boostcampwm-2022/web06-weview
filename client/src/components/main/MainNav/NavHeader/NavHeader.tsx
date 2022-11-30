import React, { MouseEventHandler } from "react";

import useNavStore from "@/store/useNavStore";

import "./NavHeader.scss";

const NavHeader = (): JSX.Element => {
  const [isOpened, setIsOpened] = useNavStore((state) => [
    state.isOpened,
    state.setIsOpened,
  ]);

  // TODO : 다른 로직으로 이동
  const handleToggleNav: MouseEventHandler = () => {
    setIsOpened(!isOpened);
  };

  return (
    <section className="nav__header">
      <img
        className="nav__header__logo"
        alt="WeView Logo"
        onClick={handleToggleNav}
      />
    </section>
  );
};

export default NavHeader;
