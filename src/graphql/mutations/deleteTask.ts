import { gql } from "../../__generated__";

export const DELETE_TASK = gql(`
 mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    id
  }
}
`);
