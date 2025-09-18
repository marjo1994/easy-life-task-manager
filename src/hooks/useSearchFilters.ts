import { useMemo } from "react";
import { useSearchStore } from "../store/searchStore";
import { parseSearchInput } from "../utils/parseSearchInput";
import { useDebounce } from "../utils/useDebounce";
import { useUsers } from "./useUsers";
import type {
  FilterTaskInput,
  PointEstimate,
  Status,
  TaskTag,
} from "../__generated__/graphql";

export const useSearchFiltes = () => {
  const { searchTerm } = useSearchStore();
  const debouncedSearch = useDebounce(searchTerm, 600);
  const { users } = useUsers();

  return useMemo(() => {
    const parsed = parseSearchInput(debouncedSearch);
    const backendFilters: FilterTaskInput = {};

    //console.log("Parsed input:", parsed);

    /*const frontendFilters = {
      searchText: parsed.name,
      hasNameSearch: !!parsed.name,
    };*/

    if (parsed.name) {
      backendFilters.name = parsed.name;
    }

    if (parsed.assigneeName) {
      const searchName = parsed.assigneeName.toLowerCase();
      const match = users.find((u) =>
        u.fullName.toLowerCase().includes(searchName)
      );
      if (match) {
        backendFilters.assigneeId = match.id;
      } else {
        backendFilters.assigneeId = "_NO_MATCH_";
      }
    }

    if (parsed.status) {
      backendFilters.status = parsed.status.toUpperCase() as Status;
    }

    if (parsed.tags && parsed.tags.length > 0) {
      backendFilters.tags = parsed.tags.map((t) => t.toUpperCase() as TaskTag);
    }

    if (parsed.pointEstimate) {
      backendFilters.pointEstimate =
        parsed.pointEstimate.toUpperCase() as PointEstimate;
    }

    if (parsed.dueDate) {
      const date = new Date(parsed.dueDate);
      if (!isNaN(date.getTime())) {
        backendFilters.dueDate = date.toISOString();
      }
    }

    //console.log("Back Filters:", backendFilters);
    //console.log("Front Filters:", frontendFilters);

    /*return {
      backendFilters: backendFilters,
      frontendFilters,
    };*/

    return backendFilters;
  }, [debouncedSearch, users]);
};
