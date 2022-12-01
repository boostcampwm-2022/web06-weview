import create from "zustand";
import { devtools } from "zustand/middleware";

export const NAV_STATE = {
  DEFAULT: 0 as const,
  SEARCH: 1 as const,
  WRITE: 2 as const,
  BOOKMARK: 3 as const,
  PROFILE: 4 as const,
  SETTING: 5 as const,
};

export type NAV_STATE_TYPE = typeof NAV_STATE[keyof typeof NAV_STATE];

interface NavStoreState {
  navState: NAV_STATE_TYPE;
}

interface NavStoreAction {
  setNavState: (newNavState: NAV_STATE_TYPE) => void;
  resetNavState: () => void;
}

interface NavStore extends NavStoreState, NavStoreAction {}

const useNavStore = create<NavStore>()(
  devtools((set) => ({
    navState: NAV_STATE.DEFAULT,
    setNavState: (newNavState) => set({ navState: newNavState }),
    resetNavState: () => set({ navState: NAV_STATE.DEFAULT }),
  }))
);

export default useNavStore;
