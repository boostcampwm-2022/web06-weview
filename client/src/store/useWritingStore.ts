import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WritingStates {
  title: string;
  content: string;
  tags: string[];
}

interface WritingActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTags: (tag: string) => void;
  removeTag: (willFilteredTag: string) => void;
  reset: () => void;
}

const initialWritingState: WritingStates = {
  title: "",
  content: "",
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
        setContent: (content: string) => set({ content }),

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
