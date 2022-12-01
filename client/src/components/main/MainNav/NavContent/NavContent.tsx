import React from "react";

import useNav from "@/hooks/useNav";
import SearchContent from "@/components/main/MainNav/NavContent/SearchContent/SearchContent";
import { NAV_STATE, NAV_STATE_TYPE } from "@/store/useNavStore";

import "./NavContent.scss";

const NAVIGATE = new Map<NAV_STATE_TYPE, () => JSX.Element>([
  [NAV_STATE.SEARCH, SearchContent],
  [NAV_STATE.PROFILE, SearchContent],
]);

const NavContent = (): JSX.Element => {
  const { isOpened, navState } = useNav();
  const Content = NAVIGATE.get(navState);

  if (isOpened || Content === undefined) {
    return <div className="nav__content hide"></div>;
  }

  return (
    <div className="nav__content show">
      <Content />
    </div>
  );
};

export default NavContent;
