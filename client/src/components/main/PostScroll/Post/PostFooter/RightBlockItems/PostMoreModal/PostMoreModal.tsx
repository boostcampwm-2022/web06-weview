import React from "react";

import Modal from "@/components/commons/Modal/core/Modal/Modal";
import useModal from "@/hooks/useModal";
import { ModalProps } from "@/types/modal";
import PostMoreModalMenu from "@/components/main/PostScroll/Post/PostFooter/RightBlockItems/PostMoreModal/PostMoreModalMenu/PostMoreModalMenu";

import "./PostMoreModal.scss";

import { deletePost } from "@/apis/post";
import { queryClient } from "@/react-query/queryClient";
import { QUERY_KEYS } from "@/react-query/queryKeys";
import useAuth from "@/hooks/useAuth";

interface PostMoreModalProps extends ModalProps {}

const PostMoreModal = ({
  postId,
  authorId,
  navigate,
}: PostMoreModalProps): JSX.Element => {
  const { isLoggedIn, myInfo } = useAuth();
  const { handleModalClose } = useModal();

  const isDeletable = isLoggedIn && myInfo?.id === authorId;

  const handleDeletePost = (): void => {
    void (async () => {
      try {
        await deletePost(postId as string);
        await queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
        handleModalClose();
      } catch (e: any) {
        alert(e.message);
      }
    })();
  };

  const handleDisplaySinglePost = (): void => {
    try {
      navigate?.();
      handleModalClose();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Modal onClose={handleModalClose} title={"메뉴를 선택해주세요."}>
      <div className="post-more">
        {isDeletable && (
          <PostMoreModalMenu text={"삭제"} onClick={handleDeletePost} />
        )}
        <PostMoreModalMenu
          text={"포스트 보기"}
          onClick={handleDisplaySinglePost}
        />
        <PostMoreModalMenu text={"취소"} onClick={handleModalClose} />
      </div>
    </Modal>
  );
};

export default PostMoreModal;
