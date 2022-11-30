import React, { useContext } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SvgIconButton from "@/components/commons/SvgIconButton/SvgIconButton";
import usePostLike from "@/hooks/usePostLike";
import { PostContext } from "@/components/main/PostScroll/Post/Post";
import "./LeftBlockItems.scss";

const primaryColor = "#84cb8d";
const textColor = "#222222";

const LikeButton = (): JSX.Element => {
  const { id, isLiked } = useContext(PostContext);

  const { isLikedState, toggleLiked } = usePostLike({
    postId: id,
    isLiked,
  });

  return (
    <SvgIconButton
      Icon={ThumbUpAltIcon}
      detail="좋아요"
      onClick={toggleLiked}
      className="post__footer__left-block--btn"
      color={`${isLikedState ? primaryColor : textColor}`}
    />
  );
};

export default LikeButton;
