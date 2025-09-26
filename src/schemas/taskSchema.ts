import { z } from "zod";
import { PointEstimate, Status, TaskTag } from "../__generated__/graphql";
import { parseISO } from "date-fns";
import { normalizeDate } from "../utils/utils";

const taskTagSchema = z.enum(TaskTag);
const statusSchema = z.enum(Status);

const pointEstimateSchema = z.custom<PointEstimate>(
  (value) => Object.values(PointEstimate).includes(value as PointEstimate),
  { message: "Point estimate is required" }
);

export const taskSchema = z.object({
  name: z
    .string()
    .min(1, "Task is empty")
    .min(3, "Min 3 characters")
    .max(20, "Max 20 characters"),
  pointEstimate: pointEstimateSchema,
  assigneeId: z.string().min(1, { message: "Assignee is required" }),
  tags: z.array(taskTagSchema).min(1, { message: "Tags are required" }),
  dueDate: z.string().refine(
    (dateString) => {
      try {
        const dateOnly = dateString.split("T")[0];
        const date = parseISO(dateOnly);

        const today = new Date();

        const todayNormalized = normalizeDate(today);
        const inputNormalized = normalizeDate(date);

        return inputNormalized.getTime() >= todayNormalized.getTime();
      } catch {
        return false;
      }
    },
    {
      message: "Insert a valid date",
    }
  ),
  status: statusSchema,
});

export type TaskFormData = z.output<typeof taskSchema>;
