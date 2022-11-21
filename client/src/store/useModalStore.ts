import create from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStates {
  isWritingModalOpened: boolean;
  isSubmitModalOpened: boolean;
  isSearchModalOpened: boolean;
}

interface ModalActions {
  openWritingModal: () => void;
  closeWritingModal: () => void;

  openSubmitModal: () => void;
  closeSubmitModal: () => void;

  openSearchModal: () => void;
  closeSearchModal: () => void;
}

const useModalStore = create<ModalStates & ModalActions>()(
  devtools((set) => ({
    isWritingModalOpened: false,
    openWritingModal: () => set(() => ({ isWritingModalOpened: true })),
    closeWritingModal: () => set(() => ({ isWritingModalOpened: false })),

    isSubmitModalOpened: false,
    openSubmitModal: () => set(() => ({ isSubmitModalOpened: true })),
    closeSubmitModal: () => set(() => ({ isSubmitModalOpened: false })),

    isSearchModalOpened: false,
    openSearchModal: () => set(() => ({ isSearchModalOpened: true })),
    closeSearchModal: () => set(() => ({ isSearchModalOpened: false })),
  }))
);

export default useModalStore;
