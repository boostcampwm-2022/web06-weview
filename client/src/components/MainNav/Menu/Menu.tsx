import React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

const Menu = (): JSX.Element => {
  return (
    <section className="menu">
      <h4 className="menu__header">메뉴</h4>
      <div className="menu__post new">
        <PostAddIcon />
        <span>새로운 포스트</span>
      </div>
      <div className="menu__post bookmark">
        <CollectionsBookmarkIcon />
        <span>저장된 포스트</span>
      </div>
    </section>
  );
};

export default Menu;
