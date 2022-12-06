import React, { MouseEventHandler } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useCommonModalStore from "@/store/useCommonModalStore";
import WriteModal from "@/components/main/Modal/WriteModal/WriteModal";
import useNav from "@/hooks/useNav";

const NewPostMenu = (): JSX.Element => {
  const { handleWrite } = useNav();
  const [openModal] = useCommonModalStore((state) => [state.openModal]);

  const handleMenuClick: MouseEventHandler = () => {
    handleWrite(() => openModal(<WriteModal />));
  };

  return (
    <NavMenu
      Icon={PostAddIcon}
      detail="새 포스트"
      onClick={handleMenuClick}
      className="nav__sidebar__menus__menu"
    />
  );
};

export default NewPostMenu;
