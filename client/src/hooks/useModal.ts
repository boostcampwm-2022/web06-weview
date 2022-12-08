import useModalStore from "@/store/useModalStore";
import { MODAL_KEY, ModalProps } from "@/types/modal";

interface UseModalResult {
  handleModalOpen: (key: MODAL_KEY, props: ModalProps) => void;
  handleModalClose: () => void;
}

const useModal = (): UseModalResult => {
  const [openModal, closeModal] = useModalStore((state) => [
    state.openModal,
    state.closeModal,
  ]);

  const handleModalOpen = (key: MODAL_KEY, props: ModalProps): void => {
    openModal(key, props);
  };

  const handleModalClose = (): void => {
    closeModal();
  };

  return { handleModalOpen, handleModalClose };
};

export default useModal;
