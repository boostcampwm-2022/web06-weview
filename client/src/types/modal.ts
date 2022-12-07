export enum MODAL_KEY {
  POST_MORE,
}

export interface ModalProps {
  postId?: string;
}

export interface ModalContext {
  key: MODAL_KEY;
  props: ModalProps;
}
