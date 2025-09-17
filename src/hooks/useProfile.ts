import { useQuery } from "@apollo/client/react";
import { GET_PROFILE } from "../graphql/queries/getProfile";

export const useProfile = () => {
  const { data, loading, error } = useQuery(GET_PROFILE);

  return {
    profile: data?.profile ?? null,
    loading,
    error,
  };
};
