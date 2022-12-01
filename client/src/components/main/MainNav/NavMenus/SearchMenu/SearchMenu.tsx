import React, { MouseEventHandler } from "react";
import SearchIcon from "@mui/icons-material/Search";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useNav from "@/hooks/useNav";
import useModalStore from "@/store/useModalStore";

const SearchMenu = (): JSX.Element => {
  const openSearchModal = useModalStore((state) => state.openSearchModal);
  const { handleSearch } = useNav();

  const handleMenuClick: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSearch(openSearchModal);
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
