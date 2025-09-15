import { gql } from "../../__generated__";

export const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      fullName
      avatar
    }
  }
`);
