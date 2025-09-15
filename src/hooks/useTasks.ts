import { useQuery } from "@apollo/client/react";
import { GET_TASKS } from "../graphql/queries/getTasks";

export function useTasks() {
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: { input: {} },
  });

  return {
    tasks: data?.tasks ?? [],
    loading,
    error,
  };
}
