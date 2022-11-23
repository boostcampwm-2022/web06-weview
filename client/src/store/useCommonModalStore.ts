import create from "zustand";
import { devtools } from "zustand/middleware";
import { ReactNode } from "react";

interface CommonModalStates {
  isOpened: boolean;
  modalContent: ReactNode | null;
}

interface CommonModalActions {
  openModal: (modalContent: ReactNode) => void;
  closeModal: () => void;
}

interface CommonModalStore extends CommonModalStates, CommonModalActions {}

const useCommonModalStore = create<CommonModalStore>()(
  devtools((set) => ({
    isOpened: false,
    modalContent: null,
    openModal: (modalContent) => set({ isOpened: true, modalContent }),
    closeModal: () => set({ isOpened: false, modalContent: null }),
  }))
);

export default useCommonModalStore;
