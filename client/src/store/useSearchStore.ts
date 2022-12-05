import create from "zustand";
import { devtools } from "zustand/middleware";

import { SearchFilter } from "@/types/search";

interface SearchStates {
  searchQuery: SearchFilter;
}

interface SearchActions {
  updateQuery: (query: SearchFilter) => void;
  reset: () => void;
}

interface SearchStore extends SearchStates, SearchActions {}

const initialSearchStates: SearchStates = {
  searchQuery: {
    lastId: "-1",
  },
};

const useSearchStore = create<SearchStore>()(
  devtools((set) => ({
    ...initialSearchStates,
    updateQuery: (query) => {
      set(() => ({ searchQuery: query }));
    },
    reset: () => set(initialSearchStates),
  }))
);

export default useSearchStore;
