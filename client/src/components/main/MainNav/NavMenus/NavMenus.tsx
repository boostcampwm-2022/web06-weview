import React from "react";

import BookmarkMenu from "@/components/main/MainNav/NavMenus/BookmarkMenu/BookmarkMenu";
import NewPostMenu from "@/components/main/MainNav/NavMenus/NewPostMenu/NewPostMenu";
import ProfileMenu from "@/components/main/MainNav/NavMenus/ProfileMenu/ProfileMenu";
import SearchMenu from "@/components/main/MainNav/NavMenus/SearchMenu/SearchMenu";

import "./NavMenus.scss";

const NavMenus = (): JSX.Element => {
  return (
    <section className="nav__sidebar__menus">
      <SearchMenu />
      <NewPostMenu />
      <BookmarkMenu />
      <ProfileMenu />
      <div className="active nav__sidebar__menus__active"></div>
    </section>
  );
};

export default NavMenus;
