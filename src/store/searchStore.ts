import { create } from "zustand";

type SearchState = {
  searchTerm: string;
  isSearchActive: boolean;
  setSearchTerm: (term: string) => void;
  activateSearch: () => void;
  clearSearch: () => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  isSearchActive: false,
  setSearchTerm: (term: string) =>
    set({ searchTerm: term, isSearchActive: false }),
  activateSearch: () => {
    set((state) => {
      if (state.searchTerm.trim()) {
        return { isSearchActive: true };
      }
      return state;
    });
  },
  clearSearch: () => {
    set({ searchTerm: "", isSearchActive: false });
  },
}));
