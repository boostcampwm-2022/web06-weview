import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WritingStore {
  title: string;
  setTitle: (title: string) => void;
  code: string;
  setCode: (code: string) => void;
  content: string;
  setContent: (code: string) => void;
  images: string[];
  setImages: (code: string) => void;
}

const useWritingStore = create<WritingStore>()(
  devtools(
    persist(
      (set) => ({
        title: "",
        setTitle: (title: string) => set({ title }),
        code: "",
        setCode: (code: string) => set({ code }),
        content: "",
        setContent: (content: string) => set({ content }),
        images: [],
        setImages: (newImg: string) =>
          set((state: WritingStore) => {
            const nextImages = [...state.images, newImg];
            return { ...state, images: nextImages };
          }),
      }),

      {
        name: "writing-store",
      }
    )
  )
);

export default useWritingStore;
