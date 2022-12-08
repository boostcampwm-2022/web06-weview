import create from "zustand";
import { devtools } from "zustand/middleware";

import { MODAL_KEY, ModalContext, ModalProps } from "@/types/modal";

interface ModalState {
  modals: ModalContext[];
}

interface ModalAction {
  openModal: (key: MODAL_KEY, props: ModalProps) => void;
  closeModal: () => void;
}

const initialState: ModalState = {
  modals: [],
};

const useModalStore = create<ModalState & ModalAction>()(
  devtools(
    (set) => ({
      ...initialState,
      openModal: (key, props) => {
        set((state) => ({
          modals: [...state.modals, { key, props }],
        }));
      },
      closeModal: () =>
        set((state) => ({
          modals: state.modals.slice(0, -1),
        })),
    }),
    {
      name: "modal-store",
    }
  )
);

export default useModalStore;
