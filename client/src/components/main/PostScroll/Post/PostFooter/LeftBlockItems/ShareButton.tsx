import React, { MouseEvent, useContext } from "react";
import ShareIcon from "@mui/icons-material/Share";

import SvgIconButton from "@/components/commons/SvgIconButton/SvgIconButton";
import { LOCAL_URL } from "@/constants/env";
import { PostContext } from "@/components/main/PostScroll/Post/Post";

import "./LeftBlockItems.scss";

const ShareButton = (): JSX.Element => {
  const { id: postId } = useContext(PostContext);
  const handleShare = (e: MouseEvent): void => {
    navigator.clipboard
      .writeText(`${LOCAL_URL}/post/${postId}`)
      .then(() => {
        alert("클립보드에 해당 포스트의 링크가 복사되었습니다.");
      })
      .catch((err) => console.error(err));
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
