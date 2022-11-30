import React, { useCallback, MouseEvent } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import useCommonModalStore from "@/store/useCommonModalStore";
import WriteModal from "@/components/main/Modal/WriteModal/WriteModal";
import "./Menu.scss";

const Menu = (): JSX.Element => {
  const [openModal] = useCommonModalStore((state) => [state.openModal]);

  const handleWriteModalOpen = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      openModal(<WriteModal />);
    },
    [openModal]
  );

  return (
    <section className="menu">
      <h4 className="menu__header">메뉴</h4>
      <div
        className="menu__post menu__post--new"
        onClick={handleWriteModalOpen}
      >
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
