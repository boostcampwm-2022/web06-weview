import create from "zustand";
import { devtools } from "zustand/middleware";

interface WritingModalStates {
  isWritingModalOpened: boolean;
  isSubmitModalOpened: boolean;
}

interface WritingModalStore extends WritingModalStates, WritingModalActions {}

interface WritingModalActions {
  openWritingModal: () => void;
  closeWritingModal: () => void;

  openSubmitModal: () => void;
  closeSubmitModal: () => void;

  closeRecentOpenedModal: (() => void) | null;
  resetRecentOpenedModal: () => void;
}

const useWritingModalStore = create<WritingModalStore>()(
  devtools((set) => ({
    isWritingModalOpened: false,
    openWritingModal: () =>
      set((state: WritingModalStore) => ({
        isWritingModalOpened: true,
        closeRecentOpenedModal: state.closeWritingModal,
      })),
    closeWritingModal: () => set(() => ({ isWritingModalOpened: false })),

    isSubmitModalOpened: false,
    openSubmitModal: () => set(() => ({ isSubmitModalOpened: true })),
    closeSubmitModal: () => set(() => ({ isSubmitModalOpened: false })),

    closeRecentOpenedModal: null,
    resetRecentOpenedModal: () =>
      set(() => ({
        closeRecentOpenedModal: null,
      })),
  }))
);

export default useWritingModalStore;
