import React from "react";

import Modal from "@/components/commons/Modal/core/Modal/Modal";
import useModal from "@/hooks/useModal";
import { ModalProps } from "@/types/modal";

interface PostMoreModalProps extends ModalProps {}

const PostMoreModal = ({ postId }: PostMoreModalProps): JSX.Element => {
  const { handleModalClose } = useModal();

  return (
    <Modal
      onClose={() => {
        handleModalClose();
      }}
      title={"메뉴를 선택해주세요."}
    >
      <div>{postId}</div>
    </Modal>
  );
};

export default PostMoreModal;
