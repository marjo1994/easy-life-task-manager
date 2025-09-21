import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries/getUsers";
import { getAvatar } from "../utils/getAvatar";

export const useUsers = () => {
  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy: "cache-first",
  });

  const usersOptions =
    data?.users?.map((user) => ({
      value: user.id,
      label: user.fullName,
      avatar: getAvatar(user.id),
    })) || [];

  return {
    users: data?.users ?? [],
    usersOptions,
    loading,
    error,
  };
};
