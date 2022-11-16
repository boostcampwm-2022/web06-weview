import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WritingStates {
  title: string;
  language: string;
  code: string;
  content: string;
  images: string[];
}

interface WritingActions {
  setTitle: (title: string) => void;
  setLanguage: (language: string) => void;
  setCode: (code: string) => void;
  setContent: (code: string) => void;
  setImages: (code: string) => void;
  reset: () => void;
}

const initialWritingState: WritingStates = {
  title: "",
  language: "",
  code: "",
  content: "",
  images: [],
};

const useWritingStore = create<WritingStates & WritingActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialWritingState,
        setTitle: (title: string) => {
          set({ title });
        },
        setLanguage: (language: string) => set({ language }),
        setCode: (code: string) => set({ code }),
        setContent: (content: string) => set({ content }),
        setImages: (newImg: string) =>
          set((state: WritingStates) => {
            return { images: [...state.images, newImg] };
          }),
        reset: () => {
          set(initialWritingState);
        },
      }),

      {
        name: "writing-store",
      }
    )
  )
);

export default useWritingStore;
