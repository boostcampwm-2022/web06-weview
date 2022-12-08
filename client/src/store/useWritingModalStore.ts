import create from "zustand";
import { devtools } from "zustand/middleware";

interface WritingModalStates {
  isSubmitModalOpened: boolean;
}

interface WritingModalStore extends WritingModalStates, WritingModalActions {}

interface WritingModalActions {
  openSubmitModal: () => void;
  closeSubmitModal: () => void;
}

const useWritingModalStore = create<WritingModalStore>()(
  devtools((set) => ({
    isSubmitModalOpened: false,
    openSubmitModal: () => set(() => ({ isSubmitModalOpened: true })),
    closeSubmitModal: () => set(() => ({ isSubmitModalOpened: false })),
  }))
);

export default useWritingModalStore;
