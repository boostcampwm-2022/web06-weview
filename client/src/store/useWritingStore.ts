import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearStore {
  title: string;
  setTitle: (title: string) => void;
  code: string;
  setCode: (code: string) => void;
  content: string;
  setContent: (code: string) => void;
}

const useBearStore = create<BearStore>()(
  devtools(
    persist(
      (set) => ({
        title: "",
        setTitle: (title: string) => set({ title }),
        code: "",
        setCode: (code: string) => set({ code }),
        content: "",
        setContent: (content: string) => set({ content }),
      }),
      {
        name: "writing-store",
      }
    )
  )
);

export default useBearStore;
