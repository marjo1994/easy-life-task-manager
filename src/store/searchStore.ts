import { create } from "zustand";

type SearchState = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));
