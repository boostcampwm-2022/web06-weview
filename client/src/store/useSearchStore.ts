import create from "zustand";
import { devtools } from "zustand/middleware";

import {
  AuthorSearchFilter,
  SearchFilter,
  SearchType,
  SingleSearchFilter,
} from "@/types/search";

export enum SEARCH_FILTER {
  DEFAULT,
  AUTHOR,
  BOOKMARK,
  SINGLE,
}

interface SearchStates {
  filter: SearchType;
  searchType: SEARCH_FILTER;
}

interface SearchActions {
  searchDefaultFilter: (query: SearchFilter) => void;
  searchAuthorFilter: (query: AuthorSearchFilter) => void;
  searchSingleFilter: (query: SingleSearchFilter) => void;
  searchBookmarkFilter: () => void;
  reset: () => void;
}

interface SearchStore extends SearchStates, SearchActions {}

const initialSearchStates: SearchStates = {
  filter: { lastId: "-1" },
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
    searchBookmarkFilter: () => {
      set({
        ...initialSearchStates,
        searchType: SEARCH_FILTER.BOOKMARK,
      });
    },
    searchSingleFilter: (singleSearchQuery: SingleSearchFilter) => {
      set({
        ...initialSearchStates,
        filter: singleSearchQuery,
        searchType: SEARCH_FILTER.SINGLE,
      });
    },
    reset: () => set(initialSearchStates),
  }))
);

export default useSearchStore;
