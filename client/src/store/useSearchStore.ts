import create from "zustand";
import { devtools } from "zustand/middleware";

import { SearchQuery } from "@/types/search";

interface SearchStates {
  searchQuery: SearchQuery;
}

interface SearchActions {
  updateQuery: (query: SearchQuery) => void;
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
