import { gql } from "../../__generated__";

export const DELETE_TASK = gql(`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`);
