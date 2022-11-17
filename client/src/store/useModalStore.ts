import create from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStore {
  isWritingModalOpened: boolean;
  openWritingModal: () => void;
  closeWritingModal: () => void;

  isSubmitModalOpened: boolean;
  openSubmitModal: () => void;
  closeSubmitModal: () => void;
}

const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    isWritingModalOpened: false,
    openWritingModal: () => set(() => ({ isWritingModalOpened: true })),
    closeWritingModal: () => set(() => ({ isWritingModalOpened: false })),

    isSubmitModalOpened: false,
    openSubmitModal: () => set(() => ({ isSubmitModalOpened: true })),
    closeSubmitModal: () => set(() => ({ isSubmitModalOpened: false })),
  }))
);

export default useModalStore;
