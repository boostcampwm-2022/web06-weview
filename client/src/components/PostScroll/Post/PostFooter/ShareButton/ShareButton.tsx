import React, { MouseEventHandler } from "react";
import ShareIcon from "@mui/icons-material/Share";
import SvgIconButton from "@/components/CommonButtons/SvgIconButton/SvgIconButton";

const ShareButton = (): JSX.Element => {
  const handleShare: MouseEventHandler = () => {
    console.log("공유하기");
  };

  return (
    <SvgIconButton
      Icon={ShareIcon}
      detail="공유하기"
      onClick={handleShare}
      className="post__footer__left-block--btn"
    />
  );
};

export default ShareButton;
