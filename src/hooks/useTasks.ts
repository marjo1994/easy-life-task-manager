import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries/getTasks";
import { useSearchStore } from "../store/searchStore";

export function useTasks() {
  const { searchTerm } = useSearchStore();
  const input = searchTerm ? { name: searchTerm } : {};
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { input },
    fetchPolicy: "cache-and-network",
  });

  return {
    tasks: data?.tasks ?? [],
    loading,
    error,
    refetch,
  };
}
