import React, { MouseEventHandler } from "react";
import SearchIcon from "@mui/icons-material/Search";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useNav from "@/hooks/useNav";

const SearchMenu = (): JSX.Element => {
  const { handleSearch } = useNav();

  const handleMenuClick: MouseEventHandler = (e) => {
    handleSearch();
  };

  return (
    <NavMenu
      Icon={SearchIcon}
      detail={"검색"}
      onClick={handleMenuClick}
      className={`nav__sidebar__menus__menu`}
    />
  );
};

export default SearchMenu;
