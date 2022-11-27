import React, { MouseEventHandler, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SvgIconButton from "@/components/CommonButtons/SvgIconButton/SvgIconButton";

const primaryColor = "#84cb8d";
const textColor = "#222222";

const LikeButton = (): JSX.Element => {
  const [liked, setLiked] = useState(false);

  const toggleLiked: MouseEventHandler = () => {
    console.log("좋아요");
    setLiked((liked) => !liked);
  };

  const handleRequestLogin: MouseEventHandler = () => {
    console.log("로그인이 필요합니다.");
  };

  if (liked === undefined) {
    return (
      <SvgIconButton
        Icon={ThumbUpAltIcon}
        detail="좋아요"
        onClick={handleRequestLogin}
        className="post__footer__left-block--btn"
      />
    );
  }

  return (
    <SvgIconButton
      Icon={ThumbUpAltIcon}
      detail="좋아요"
      onClick={toggleLiked}
      className="post__footer__left-block--btn"
      color={`${liked ? primaryColor : textColor}`}
    />
  );
};

export default LikeButton;
