import create from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStore {
  isWritingModalOpened: boolean;
  openWritingModal: () => void;
  closeWritingModal: () => void;
}

const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    isWritingModalOpened: false,
    openWritingModal: () => set(() => ({ isWritingModalOpened: true })),
    closeWritingModal: () => set(() => ({ isWritingModalOpened: false })),
  }))
);

export default useModalStore;
