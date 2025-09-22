import { gql } from "../../__generated__";

export const UPDATE_TASK = gql(`
mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
    name
    status
    pointEstimate
    tags
    dueDate
    assignee {
      id
      fullName
    }
    position
  }
}`);
