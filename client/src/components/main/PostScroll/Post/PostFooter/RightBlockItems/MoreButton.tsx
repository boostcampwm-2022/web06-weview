import React, { useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

import SvgIconButton from "@/components/commons/SvgIconButton/SvgIconButton";
import useModal from "@/hooks/useModal";
import { PostContext } from "@/components/main/PostScroll/Post/Post";
import { MODAL_KEY } from "@/types/modal";

import "./RightBlockItems.scss";

const MoreButton = (): JSX.Element => {
  const navigate = useNavigate();
  const { id, author } = useContext(PostContext);
  const { handleModalOpen } = useModal();

  const handleSinglePost = (): void => navigate(`/post/${id}`);

  return (
    <>
      <SvgIconButton
        Icon={MoreHorizIcon}
        detail="더보기"
        onClick={() =>
          handleModalOpen(MODAL_KEY.POST_MORE, {
            postId: id,
            authorId: author.id,
            navigate: handleSinglePost,
          })
        }
        className="post__footer__right-block--btn"
      />
    </>
  );
};

export default MoreButton;
