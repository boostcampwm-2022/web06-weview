import React from "react";

import "./NavContent.scss";

interface NavContentProps {
  isOpened: boolean;
}

const NavContent = ({ isOpened }: NavContentProps): JSX.Element => {
  return (
    <div className={`nav__content ${isOpened ? "opened" : "closed"}`}></div>
  );
};

export default NavContent;
