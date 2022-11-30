import React, { MouseEventHandler } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SvgIconButton from "@/components/commons/SvgIconButton/SvgIconButton";
import "./RightBlockItems.scss";

const MoreButton = (): JSX.Element => {
  const handleOpenMore: MouseEventHandler = () => {};

  return (
    <SvgIconButton
      Icon={MoreHorizIcon}
      detail="더보기"
      onClick={handleOpenMore}
      className="post__footer__right-block--btn"
    />
  );
};

export default MoreButton;
