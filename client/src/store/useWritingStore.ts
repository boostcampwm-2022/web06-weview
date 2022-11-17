import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WritingStates {
  title: string;
  language: string;
  code: string;
  content: string;
  images: string[];
  tags: string[];
}

interface WritingActions {
  setTitle: (title: string) => void;
  setLanguage: (language: string) => void;
  setCode: (code: string) => void;
  setContent: (content: string) => void;
  setImages: (imageSrc: string) => void;
  setTags: (tag: string) => void;
  removeTag: (willFilteredTag: string) => void;
  reset: () => void;
}

const initialWritingState: WritingStates = {
  title: "",
  language: "",
  code: "",
  content: "",
  images: [],
  tags: [],
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
        setTags: (newTag) =>
          set((state: WritingStates) => {
            return { tags: [...state.tags, newTag] };
          }),
        removeTag: (willFilteredTag: string) =>
          set((state: WritingStates) => {
            return {
              tags: state.tags.filter((tag) => tag !== willFilteredTag),
            };
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
