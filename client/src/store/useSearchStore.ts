import create from "zustand";
import { devtools } from "zustand/middleware";

import { AuthorSearchFilter, SearchFilter, SearchType } from "@/types/search";

export type SearchFilterType = "default" | "author";

interface SearchStates {
  filter: SearchType;
  searchType: SearchFilterType;
}

interface SearchActions {
  searchDefaultFilter: (query: SearchFilter) => void;
  searchAuthorFilter: (query: AuthorSearchFilter) => void;
  reset: () => void;
}

interface SearchStore extends SearchStates, SearchActions {}

const initialSearchStates: SearchStates = {
  filter: {},
  searchType: "default",
};

const useSearchStore = create<SearchStore>()(
  devtools((set) => ({
    ...initialSearchStates,
    searchDefaultFilter: (defaultSearchQuery) => {
      set(() => ({
        ...initialSearchStates,
        filter: defaultSearchQuery,
        searchType: "default",
      }));
    },
    searchAuthorFilter: (authorSearchQuery) => {
      set({
        ...initialSearchStates,
        filter: authorSearchQuery,
        searchType: "author",
      });
    },
    reset: () => set(initialSearchStates),
  }))
);

export default useSearchStore;
