import { gql } from "../../__generated__";

export const CREATE_TASK = gql(`
mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    name
    status
    pointEstimate
    tags
    assignee {
      id
      fullName
    }
    dueDate
    position
  }
}
`);
