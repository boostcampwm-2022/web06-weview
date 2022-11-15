import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearStore {
  title: string;
  setTitle: (title: string) => void;
  code: string;
  setCode: (code: string) => void;
}

const useBearStore = create<BearStore>()(
  devtools(
    persist(
      (set) => ({
        title: "",
        setTitle: (title: string) => set({ title }),
        code: "",
        setCode: (code: string) => set({ code }),
      }),
      {
        name: "writing-store",
      }
    )
  )
);

export default useBearStore;
