import React, { MouseEventHandler, useContext } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SvgIconButton from "@/components/commons/SvgIconButton/SvgIconButton";
import usePostLike from "@/hooks/usePostLike";
import { PostContext } from "@/components/PostScroll/Post/Post";

const primaryColor = "#84cb8d";
const textColor = "#222222";

const LikeButton = (): JSX.Element => {
  const { id, isLiked } = useContext(PostContext);

  const toggleLiked: MouseEventHandler = () => {
    if (typeof isLiked === "undefined") {
      alert("로그인 후 이용해 주세요");
      return;
    }
    likeToggleMutation.mutate();
  };

  const handleRequestLogin: MouseEventHandler = () => {
    alert("로그인 후 이용해주세요");
  };

  if (isLiked === undefined) {
    return (
      <SvgIconButton
        Icon={ThumbUpAltIcon}
        detail="좋아요"
        onClick={handleRequestLogin}
        className="post__footer__left-block--btn"
      />
    );
  }

  const { isLikedState, likeToggleMutation } = usePostLike({
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
