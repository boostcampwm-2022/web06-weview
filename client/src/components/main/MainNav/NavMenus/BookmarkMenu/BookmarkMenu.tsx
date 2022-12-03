import React, { MouseEventHandler } from "react";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useNav from "@/hooks/useNav";

const BookmarkMenu = (): JSX.Element => {
  const { handleBookmark } = useNav();

  const handleMenuClick: MouseEventHandler = () => {
    handleBookmark();
  };
  return (
    <NavMenu
      Icon={BookmarksOutlinedIcon}
      detail="북마크"
      onClick={handleMenuClick}
      className="nav__sidebar__menus__menu"
    />
  );
};

export default BookmarkMenu;
