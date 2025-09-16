import { z } from "zod";

import { PointEstimate, Status, TaskTag } from "../__generated__/graphql";

const pointEstimateSchema = z.enum(PointEstimate);
const taskTagSchema = z.enum(TaskTag);
const statusSchema = z.enum(Status);

export const taskSchema = z.object({
  name: z.string().min(1, { message: "Task is empty" }),
  pointEstimate: pointEstimateSchema,
  assigneeId: z.string().min(1, { message: "Assignee is required" }),
  tags: z.array(taskTagSchema).min(1, { message: "Tags are required" }),
  dueDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Insert a valid date",
  }),
  status: statusSchema,
});
