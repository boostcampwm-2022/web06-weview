import create from "zustand";
import { devtools } from "zustand/middleware";

import { AuthorSearchFilter, SearchFilter, SearchType } from "@/types/search";

export enum SEARCH_FILTER {
  DEFAULT,
  AUTHOR,
}

interface SearchStates {
  filter: SearchType;
  searchType: SEARCH_FILTER;
}

interface SearchActions {
  searchDefaultFilter: (query: SearchFilter) => void;
  searchAuthorFilter: (query: AuthorSearchFilter) => void;
  reset: () => void;
}

interface SearchStore extends SearchStates, SearchActions {}

const initialSearchStates: SearchStates = {
  filter: {},
  searchType: SEARCH_FILTER.DEFAULT,
};

const useSearchStore = create<SearchStore>()(
  devtools((set) => ({
    ...initialSearchStates,
    searchDefaultFilter: (defaultSearchQuery) => {
      set(() => ({
        ...initialSearchStates,
        filter: defaultSearchQuery,
        searchType: SEARCH_FILTER.DEFAULT,
      }));
    },
    searchAuthorFilter: (authorSearchQuery) => {
      set({
        ...initialSearchStates,
        filter: authorSearchQuery,
        searchType: SEARCH_FILTER.AUTHOR,
      });
    },
    reset: () => set(initialSearchStates),
  }))
);

export default useSearchStore;
