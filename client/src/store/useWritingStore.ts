import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WritingStore {
  title: string;
  setTitle: (title: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  code: string;
  setCode: (code: string) => void;
  content: string;
  setContent: (code: string) => void;
  images: string[];
  setImages: (code: string) => void;
  setEmptyWithoutLanguage: () => void;
}

const useWritingStore = create<WritingStore>()(
  devtools(
    persist(
      (set) => ({
        title: "",
        setTitle: (title: string) => set({ title }),
        language: "",
        setLanguage: (language: string) => set({ language }),
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
        setEmptyWithoutLanguage: () =>
          set((state: WritingStore) => {
            return {
              ...state,
              title: "",
              code: "",
              content: "",
              images: [],
            };
          }),
      }),

      {
        name: "writing-store",
      }
    )
  )
);

export default useWritingStore;
