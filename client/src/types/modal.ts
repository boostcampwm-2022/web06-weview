export enum MODAL_KEY {
  POST_MORE,
}

export interface ModalProps {
  postId?: string;
  authorId?: string;
  navigate?: () => void;
}

export interface ModalContext {
  key: MODAL_KEY;
  props: ModalProps;
}
