import { faker } from "@faker-js/faker";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries/getUsers";

export const useUsers = () => {
  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });

  const usersWithValueLabel =
    data?.users?.map((user) => ({
      value: user.id,
      label: user.fullName,
      avatar: faker.image.avatar(),
    })) || [];

  return {
    users: data?.users ?? [],
    usersOptions: usersWithValueLabel,
    loading,
    error,
  };
};
