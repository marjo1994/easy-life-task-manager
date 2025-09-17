import { gql } from "../../__generated__";

export const GET_PROFILE = gql(`query Profile {
  profile {
    id
    fullName
    email
    createdAt
    updatedAt
    type
  }
}`);
