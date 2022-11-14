import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearStore {
  title: string;
  setTitle: (title: string) => void;
}

const useBearStore = create<BearStore>()(
  devtools(
    persist(
      (set) => ({
        title: "",
        setTitle: (title: string) => set({ title }),
      }),
      {
        name: "writing-store",
      }
    )
  )
);

export default useBearStore;
