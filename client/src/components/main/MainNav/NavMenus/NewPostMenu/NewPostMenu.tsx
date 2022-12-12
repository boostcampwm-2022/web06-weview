import React, { MouseEventHandler } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";

import NavMenu from "@/components/main/MainNav/NavMenus/NavMenu/NavMenu";
import useCommonModalStore from "@/store/useCommonModalStore";
import WriteModal from "@/components/main/Modal/WriteModal/WriteModal";
import useNav from "@/hooks/useNav";
import useAuthStore from "@/store/useAuthStore";
import useAuth from "@/hooks/useAuth";

const NewPostMenu = (): JSX.Element => {
  const { handleWrite } = useNav();
  const [openModal] = useCommonModalStore((state) => [state.openModal]);
  const myInfo = useAuthStore((state) => state.myInfo);
  const { handleLogin } = useAuth();
  const handleMenuClick: MouseEventHandler = () => {
    if (myInfo === null) {
      alert("로그인이 필요합니다.");
      handleLogin();
      return;
    }
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
