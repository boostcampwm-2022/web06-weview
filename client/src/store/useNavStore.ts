import create from "zustand";
import { devtools } from "zustand/middleware";

interface NavStoreState {
  isOpened: boolean;
}

interface NavStoreAction {
  setIsOpened: (newIsOpened: boolean) => void;
}

interface NavStore extends NavStoreState, NavStoreAction {}

const useNavStore = create<NavStore>()(
  devtools((set) => ({
    isOpened: true,
    setIsOpened: (newIsOpened) => set({ isOpened: newIsOpened }),
  }))
);

export default useNavStore;
