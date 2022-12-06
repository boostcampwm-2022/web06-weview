import React, { useContext } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

import { PostContext } from "@/components/main/PostScroll/Post/Post";
import SvgIconButton from "@/components/commons/SvgIconButton/SvgIconButton";
import useBookmark from "@/hooks/useBookmark";

const BookmarkButton = (): JSX.Element => {
  const { id: postId, isBookmarked } = useContext(PostContext);
  const { isBookmarkedState, toggleBookmark } = useBookmark({
    postId,
    isBookmarked,
  });

  return (
    <SvgIconButton
      Icon={isBookmarkedState ? BookmarkAddedIcon : BookmarkBorderIcon}
      detail="북마크"
      onClick={toggleBookmark}
      className="post__footer__left-block--btn"
    />
  );
};

export default BookmarkButton;
