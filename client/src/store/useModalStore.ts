import create from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStates {
  isWritingModalOpened: boolean;
  isSubmitModalOpened: boolean;
  isSearchModalOpened: boolean;
}

interface ModalStore extends ModalStates, ModalActions {}

interface ModalActions {
  openWritingModal: () => void;
  closeWritingModal: () => void;

  openSubmitModal: () => void;
  closeSubmitModal: () => void;

  openSearchModal: () => void;
  closeSearchModal: () => void;

  closeRecentOpenedModal: (() => void) | null;
  resetRecentOpenedModal: () => void;
}

const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    isWritingModalOpened: false,
    openWritingModal: () =>
      set((state: ModalStore) => ({
        isWritingModalOpened: true,
        closeRecentOpenedModal: state.closeWritingModal,
      })),
    closeWritingModal: () => set(() => ({ isWritingModalOpened: false })),

    isSubmitModalOpened: false,
    openSubmitModal: () => set(() => ({ isSubmitModalOpened: true })),
    closeSubmitModal: () => set(() => ({ isSubmitModalOpened: false })),

    isSearchModalOpened: false,
    openSearchModal: () =>
      set((state: ModalStore) => ({
        isSearchModalOpened: true,
        closeRecentOpenedModal: state.closeSearchModal,
      })),
    closeSearchModal: () => set(() => ({ isSearchModalOpened: false })),

    closeRecentOpenedModal: null,
    resetRecentOpenedModal: () =>
      set(() => ({
        closeRecentOpenedModal: null,
      })),
  }))
);

export default useModalStore;
