import { gql } from "../../__generated__";

export const GET_TASKS = gql(`
  query GetTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      pointEstimate
      dueDate
      status
      tags
      assignee {
        fullName
      }
    }
  }
`);
