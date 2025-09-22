import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries/getTasks";
import type { FilterTaskInput } from "../__generated__/graphql";

export const useTasks = (filters: FilterTaskInput = {}) => {
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { input: filters },
    fetchPolicy: "cache-and-network",
  });

  const getFriendlyErrorMessage = (apolloError: any): string | null => {
    if (!apolloError) return null;

    const errorMessage = apolloError.message || "";

    if (
      errorMessage.includes("Response not successful: Received status code 400")
    ) {
      return "Invalid search parameters. Please check your filters and try again.";
    }

    return apolloError.message;
  };

  return {
    tasks: data?.tasks ?? [],
    loading,
    error,
    errorMessage: error ? getFriendlyErrorMessage(error) : null,
    refetch,
  };
};
