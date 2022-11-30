import React, { MouseEventHandler } from "react";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";

const BookmarkMenu = (): JSX.Element => {
  const handleMenuClick: MouseEventHandler = () => {
    console.log("bookmark menu");
  };
  return (
    <NavMenu
      Icon={BookmarksOutlinedIcon}
      detail="북마크"
      onClick={handleMenuClick}
      className="nav__menus__menu"
    />
  );
};

export default BookmarkMenu;
