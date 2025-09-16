import { gql } from "../../__generated__";

export const CREATE_TASK = gql(`
mutation CreateTask($createTaskInput: CreateTaskInput!) {
  createTask(input: $createTaskInput) {
    id
    name
    status
    pointEstimate
    tags
    assignee {
      fullName
    }
    dueDate
  }
}
`);
