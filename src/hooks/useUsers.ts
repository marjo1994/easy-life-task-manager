import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries/getUsers";

export function useUsers() {
  const { data, loading, error } = useQuery(GET_USERS);

  const usersWithValueLabel =
    data?.users?.map((user) => ({
      value: user.fullName,
      label: user.fullName,
    })) || [];

  return {
    users: data?.users ?? [],
    usersOptions: usersWithValueLabel,
    loading,
    error,
  };
}
