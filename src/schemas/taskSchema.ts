import { z } from "zod";

import { PointEstimate, Status, TaskTag } from "../__generated__/graphql";

const pointEstimateSchema = z.enum(PointEstimate);
const taskTagSchema = z.enum(TaskTag);
const statusSchema = z.enum(Status);

export const taskSchema = z.object({
  name: z.string().min(1, { message: "Is required" }),
  pointEstimate: pointEstimateSchema,
  assigneeId: z.string().min(1, { message: "Is required" }),
  tags: z.array(taskTagSchema).min(1, { message: "Is required" }),
  dueDate: z.string().min(1, {
    message: "Is required",
  }),
  status: statusSchema,
});
