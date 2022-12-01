import React, { useCallback, useContext } from "react";
import ForumIcon from "@mui/icons-material/Forum";

import useCommonModalStore from "@/store/useCommonModalStore";
import ReviewModal from "@/components/main/Modal/ReviewModal/ReviewModal";
import { PostContext } from "@/components/main/PostScroll/Post/Post";
import SvgIconButton from "@/components/commons/SvgIconButton/SvgIconButton";

import "./LeftBlockItems.scss";

const ReviewButton = (): JSX.Element => {
  const { id: postId, code, language } = useContext(PostContext);
  const [openModal] = useCommonModalStore((state) => [state.openModal]);

  const handleOpenReviewModal = useCallback(() => {
    openModal(<ReviewModal postId={postId} code={code} language={language} />);
  }, [openModal]);

  return (
    <SvgIconButton
      Icon={ForumIcon}
      detail="리뷰보기"
      onClick={handleOpenReviewModal}
      className="post__footer__left-block--btn"
    />
  );
};

export default ReviewButton;
