import React, { MouseEventHandler } from "react";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useNav from "@/hooks/useNav";
import useSearchStore from "@/store/useSearchStore";
import useAuth from "@/hooks/useAuth";

const BookmarkMenu = (): JSX.Element => {
  const { handleBookmark } = useNav();
  const { checkLogin } = useAuth();
  const searchBookmarkFilter = useSearchStore(
    (state) => state.searchBookmarkFilter
  );

  const handleMenuClick: MouseEventHandler = () => {
    if (checkLogin()) {
      console.log("hello");
      handleBookmark(searchBookmarkFilter);
    }
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
