import { TaskTag } from "../__generated__/graphql";

export const TaskTagOptions = Object.values(TaskTag).map((tag) => ({
  value: tag,
  label: tag,
}));
