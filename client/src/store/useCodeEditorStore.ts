import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { DEFAULT_LANGUAGE } from "@/constants/options";

interface CodeEditorState {
  language: string;
  code: string;
  images: string[];
}

interface CodeEditorAction {
  setLanguage: (language: string) => void;
  setCode: (code: string) => void;
  setImages: (imageSrc: string) => void;
  removeImage: (imageIdx: number) => void;
  reset: () => void;
}

const initialCodeEditorState: CodeEditorState = {
  language: DEFAULT_LANGUAGE,
  code: "",
  images: [],
};

const useCodeEditorStore = create<CodeEditorState & CodeEditorAction>()(
  devtools(
    persist(
      (set) => ({
        ...initialCodeEditorState,
        setLanguage: (language: string) => set({ language }),
        setCode: (code: string) => set({ code }),
        setImages: (newImg: string) =>
          set((state: CodeEditorState) => {
            return { images: [...state.images, newImg] };
          }),
        removeImage: (willFilteredIndex: number) =>
          set((state: CodeEditorState) => {
            return {
              images: state.images.filter(
                (src, idx) => idx !== willFilteredIndex
              ),
            };
          }),
        reset: () => {
          set(initialCodeEditorState);
        },
      }),

      {
        name: "code-editor-store",
      }
    )
  )
);

export default useCodeEditorStore;
