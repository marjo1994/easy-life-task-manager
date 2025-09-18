import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries/getTasks";
import type { FilterTaskInput } from "../__generated__/graphql";

export const useTasks = (filters: FilterTaskInput = {}) => {
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { input: filters },
    fetchPolicy: "cache-and-network",
  });

  return {
    tasks: data?.tasks ?? [],
    loading,
    error,
    refetch,
  };
};
