import React, { useCallback } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import useModalStore from "@/store/useModalStore";

const Menu = (): JSX.Element => {
  const { openWritingModal } = useModalStore((state) => ({
    openWritingModal: state.openWritingModal,
  }));

  return (
    <section className="menu">
      <h4 className="menu__header">메뉴</h4>
      <div className="menu__post menu__post--new" onClick={openWritingModal}>
        <PostAddIcon />
        <span>새로운 포스트</span>
      </div>
      <div className="menu__post menu__post--bookmark">
        <CollectionsBookmarkIcon />
        <span>저장된 포스트</span>
      </div>
    </section>
  );
};

export default Menu;
