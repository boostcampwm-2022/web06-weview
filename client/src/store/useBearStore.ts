import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearStore {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearStore>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);

export default useBearStore;
